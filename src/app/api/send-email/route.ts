import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(req: Request) {
  const { name, email, subject, message } = await req.json()

  if (!name || !email || !subject || !message) {
    return NextResponse.json({ success: false, message: 'Missing required fields' }, { status: 400 })
  }

  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  })

  try {
    await transporter.sendMail({
      from: `"${name} via Contact Form" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_RECEIVER,
      subject: `New contact from ${name}: ${subject}`,
      html: `
        <div style="font-family: sans-serif; line-height: 1.6; color: #333;">
          <h2 style="color: #0a66c2;">📬 New Contact Message</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <div style="background-color: #f4f4f4; padding: 12px; border-radius: 6px;">
            <p style="white-space: pre-wrap; margin: 0;">${message}</p>
          </div>
          <hr style="margin-top: 24px;" />
          <p style="font-size: 12px; color: #888;">Sent from your portfolio contact form.</p>
        </div>
      `,
      text: `
    New Contact Message
    
    Name: ${name}
    Email: ${email}
    Subject: ${subject}
    Message:
    ${message}
    `
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ success: false, message: 'Failed to send email' }, { status: 500 })
  }
}
