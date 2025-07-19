import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json()
    
    if (password === process.env.APP_PASSWORD) {
      const response = NextResponse.json({ success: true })
      
      response.cookies.set('gym-tracker-auth', 'true', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7
      })
      
      return response
    }
    
    return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  const response = NextResponse.json({ success: true })
  
  // Clear the cookie
  response.cookies.set('gym-tracker-auth', '', {
    httpOnly: true,
    expires: new Date(0)
  })
  
  return response
}