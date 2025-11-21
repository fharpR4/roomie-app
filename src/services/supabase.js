import { createClient } from '@supabase/supabase-js'

// Get environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Validate environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables!')
  console.error('Please check your .env file')
}

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})

// =============================================
// AUTHENTICATION METHODS
// =============================================

/**
 * Sign up a new user
 */
export const signUp = async ({ email, password, fullName, phone }) => {
  try {
    // 1. Create auth user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          phone: phone
        }
      }
    })

    if (authError) throw authError

    // 2. Create profile
    if (authData.user) {
      const { error: profileError } = await supabase
        .from('profiles')
        .insert([
          {
            id: authData.user.id,
            full_name: fullName,
            email: email,
            phone: phone,
            verified: false
          }
        ])

      if (profileError) throw profileError
    }

    return { data: authData, error: null }
  } catch (error) {
    console.error('Sign up error:', error)
    return { data: null, error: error.message }
  }
}

/**
 * Sign in existing user
 */
export const signIn = async ({ email, password }) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) throw error

    return { data, error: null }
  } catch (error) {
    console.error('Sign in error:', error)
    return { data: null, error: error.message }
  }
}

/**
 * Sign out current user
 */
export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    return { error: null }
  } catch (error) {
    console.error('Sign out error:', error)
    return { error: error.message }
  }
}

/**
 * Get current user session
 */
export const getCurrentUser = async () => {
  try {
    const { data: { session }, error } = await supabase.auth.getSession()
    if (error) throw error
    return { user: session?.user || null, error: null }
  } catch (error) {
    console.error('Get user error:', error)
    return { user: null, error: error.message }
  }
}

/**
 * Get user profile by ID
 */
export const getUserProfile = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error('Get profile error:', error)
    return { data: null, error: error.message }
  }
}

/**
 * Update user profile
 */
export const updateUserProfile = async (userId, updates) => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId)
      .select()
      .single()

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error('Update profile error:', error)
    return { data: null, error: error.message }
  }
}

// =============================================
// ROOMS METHODS
// =============================================

/**
 * Get all available rooms
 */
export const getRooms = async (filters = {}) => {
  try {
    let query = supabase
      .from('rooms')
      .select(`
        *,
        landlord:landlord_id(full_name, avatar_url),
        bids:bids(count)
      `)
      .eq('is_available', true)
      .order('created_at', { ascending: false })

    // Apply filters
    if (filters.city) {
      query = query.eq('city', filters.city)
    }
    if (filters.minPrice) {
      query = query.gte('price', filters.minPrice)
    }
    if (filters.maxPrice) {
      query = query.lte('price', filters.maxPrice)
    }
    if (filters.roomType) {
      query = query.eq('room_type', filters.roomType)
    }

    const { data, error } = await query

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error('Get rooms error:', error)
    return { data: null, error: error.message }
  }
}

/**
 * Get single room by ID
 */
export const getRoom = async (roomId) => {
  try {
    const { data, error } = await supabase
      .from('rooms')
      .select(`
        *,
        landlord:landlord_id(id, full_name, avatar_url, phone),
        bids:bids(id, amount, bidder_id, status, created_at)
      `)
      .eq('id', roomId)
      .single()

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error('Get room error:', error)
    return { data: null, error: error.message }
  }
}

/**
 * Create new room listing
 */
export const createRoom = async (roomData) => {
  try {
    const { data, error } = await supabase
      .from('rooms')
      .insert([roomData])
      .select()
      .single()

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error('Create room error:', error)
    return { data: null, error: error.message }
  }
}

/**
 * Search rooms by location or title
 */
export const searchRooms = async (searchTerm) => {
  try {
    const { data, error } = await supabase
      .from('rooms')
      .select('*')
      .or(`title.ilike.%${searchTerm}%,location.ilike.%${searchTerm}%,city.ilike.%${searchTerm}%`)
      .eq('is_available', true)
      .limit(20)

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error('Search rooms error:', error)
    return { data: null, error: error.message }
  }
}

// =============================================
// BIDS METHODS
// =============================================

/**
 * Place a bid on a room
 */
export const placeBid = async (bidData) => {
  try {
    const { data, error } = await supabase
      .from('bids')
      .insert([bidData])
      .select()
      .single()

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error('Place bid error:', error)
    return { data: null, error: error.message }
  }
}

/**
 * Get user's bids
 */
export const getUserBids = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('bids')
      .select(`
        *,
        room:room_id(id, title, location, price, images)
      `)
      .eq('bidder_id', userId)
      .order('created_at', { ascending: false })

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error('Get bids error:', error)
    return { data: null, error: error.message }
  }
}

/**
 * Get bids for a room
 */
export const getRoomBids = async (roomId) => {
  try {
    const { data, error } = await supabase
      .from('bids')
      .select(`
        *,
        bidder:bidder_id(id, full_name, avatar_url)
      `)
      .eq('room_id', roomId)
      .order('amount', { ascending: false })

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error('Get room bids error:', error)
    return { data: null, error: error.message }
  }
}

// =============================================
// MESSAGES METHODS
// =============================================

/**
 * Send a message
 */
export const sendMessage = async (messageData) => {
  try {
    const { data, error } = await supabase
      .from('messages')
      .insert([messageData])
      .select()
      .single()

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error('Send message error:', error)
    return { data: null, error: error.message }
  }
}

/**
 * Get conversations for a user
 */
export const getConversations = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('messages')
      .select(`
        *,
        sender:sender_id(id, full_name, avatar_url),
        receiver:receiver_id(id, full_name, avatar_url)
      `)
      .or(`sender_id.eq.${userId},receiver_id.eq.${userId}`)
      .order('created_at', { ascending: false })

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error('Get conversations error:', error)
    return { data: null, error: error.message }
  }
}

// =============================================
// NOTIFICATIONS METHODS
// =============================================

/**
 * Get user notifications
 */
export const getNotifications = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(20)

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error('Get notifications error:', error)
    return { data: null, error: error.message }
  }
}

/**
 * Mark notification as read
 */
export const markNotificationRead = async (notificationId) => {
  try {
    const { error } = await supabase
      .from('notifications')
      .update({ is_read: true })
      .eq('id', notificationId)

    if (error) throw error
    return { error: null }
  } catch (error) {
    console.error('Mark notification read error:', error)
    return { error: error.message }
  }
}

// =============================================
// FILE UPLOAD (Cloudinary or Supabase Storage)
// =============================================

/**
 * Upload file to Supabase Storage
 */
export const uploadFile = async (bucket, path, file) => {
  try {
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(path, file, {
        cacheControl: '3600',
        upsert: false
      })

    if (error) throw error

    // Get public URL
    const { data: urlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(path)

    return { data: urlData.publicUrl, error: null }
  } catch (error) {
    console.error('Upload file error:', error)
    return { data: null, error: error.message }
  }
}

export default supabase