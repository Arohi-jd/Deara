import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { supabase } from '../supabaseClient';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export function CartProvider({ children }) {
  const { user } = useAuth();
  const [cart, setCart] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCart = useCallback(async () => {
    try {
      if (!user) {
        throw new Error('User not authenticated');
      }

      // First, try to get existing cart
      let { data: cartData, error: cartError } = await supabase
        .from('carts')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (cartError && cartError.code === 'PGRST116') {
        // Cart doesn't exist, create one
        const { data: newCart, error: createError } = await supabase
          .from('carts')
          .insert([{ user_id: user.id }])
          .select()
          .single();

        if (createError) {
          console.error('Error creating cart:', createError);
          throw new Error('Failed to create cart. Please try again later.');
        }
        cartData = newCart;
      } else if (cartError) {
        console.error('Error fetching cart:', cartError);
        throw new Error('Failed to fetch cart. Please try again later.');
      }

      if (!cartData) {
        throw new Error('Failed to get or create cart');
      }

      setCart(cartData);

      // Fetch cart items
      const { data: items, error: itemsError } = await supabase
        .from('cart_items')
        .select(`
          *,
          products (
            id,
            name,
            price,
            image_url
          )
        `)
        .eq('cart_id', cartData.id);

      if (itemsError) {
        console.error('Error fetching cart items:', itemsError);
        throw new Error('Failed to fetch cart items. Please try again later.');
      }

      const nextItems = items || [];
      setCartItems(nextItems);

      return { cartData, items: nextItems };
    } catch (error) {
      console.error('Error in fetchCart:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      fetchCart().catch(error => {
        console.error('Failed to fetch cart:', error);
        setLoading(false);
      });
    } else {
      setCart(null);
      setCartItems([]);
      setLoading(false);
    }
  }, [user, fetchCart]);

  const addToCart = useCallback(async (productId, quantity = 1) => {
    try {
      if (!user) {
        throw new Error('You must be logged in to add items to cart');
      }

      // Ensure cart exists
      let activeCart = cart;
      let activeItems = cartItems;

      if (!activeCart) {
        const result = await fetchCart();
        activeCart = result?.cartData;
        activeItems = result?.items || [];
      }

      // Double check cart exists after fetch
      if (!activeCart) {
        throw new Error('Failed to create cart. Please try again.');
      }

      // Check if item already exists in cart
      const existingItem = activeItems.find(item => item.product_id === productId);

      if (existingItem) {
        // Update quantity
        const { error } = await supabase
          .from('cart_items')
          .update({ quantity: existingItem.quantity + quantity })
          .eq('id', existingItem.id);

        if (error) {
          console.error('Error updating cart item:', error);
          throw new Error('Failed to update cart item. Please try again.');
        }
      } else {
        // Add new item
        const { error } = await supabase
          .from('cart_items')
          .insert([{
            cart_id: activeCart.id,
            product_id: productId,
            quantity: quantity
          }]);

        if (error) {
          console.error('Error adding to cart:', error);
          throw new Error('Failed to add item to cart. Please try again.');
        }
      }

      // Refresh cart items
      await fetchCart();
      return true;
    } catch (error) {
      console.error('Error in addToCart:', error);
      throw error;
    }
  }, [user, cart, cartItems, fetchCart]);

  const updateQuantity = useCallback(async (itemId, quantity) => {
    try {
      if (quantity <= 0) {
        await removeFromCart(itemId);
        return;
      }

      const { error } = await supabase
        .from('cart_items')
        .update({ quantity })
        .eq('id', itemId);

      if (error) {
        console.error('Error updating quantity:', error);
        throw new Error('Failed to update quantity. Please try again.');
      }
      await fetchCart();
    } catch (error) {
      console.error('Error in updateQuantity:', error);
      throw error;
    }
  }, [fetchCart]);

  const removeFromCart = useCallback(async (itemId) => {
    try {
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('id', itemId);

      if (error) {
        console.error('Error removing from cart:', error);
        throw new Error('Failed to remove item from cart. Please try again.');
      }
      await fetchCart();
    } catch (error) {
      console.error('Error in removeFromCart:', error);
      throw error;
    }
  }, [fetchCart]);

  const clearCart = useCallback(async () => {
    try {
      if (!cart) return;

      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('cart_id', cart.id);

      if (error) {
        console.error('Error clearing cart:', error);
        throw new Error('Failed to clear cart. Please try again.');
      }
      setCartItems([]);
    } catch (error) {
      console.error('Error in clearCart:', error);
      throw error;
    }
  }, [cart]);

  const getTotal = useCallback(() => {
    return cartItems.reduce((total, item) => {
      return total + (item.products.price * item.quantity);
    }, 0);
  }, [cartItems]);

  const contextValue = useMemo(() => ({
    cart,
    cartItems,
    loading,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getTotal,
    fetchCart,
  }), [
    cart,
    cartItems,
    loading,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    fetchCart,
  ]);

  return (
    <CartContext.Provider
      value={contextValue}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}