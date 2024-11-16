import { recieveEmail, sendEmail } from "./sendEmail";

export const welcomeEmail = async (to: string, username: string) => {
  const subject = "Welcome to BlogSpace!";
  const content = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
      <h2 style="color: #2c3e50; margin-bottom: 20px;">Dear ${username},</h2>

      <p style="font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
        Welcome to BlogSpace! We're thrilled to have you join our community of writers and readers.
      </p>

      <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
        <p style="font-weight: bold; margin-bottom: 10px;">You can now:</p>
        <ul style="list-style-type: none; padding-left: 0;">
          <li style="margin-bottom: 8px;">• Create and publish your own blog posts</li>
          <li style="margin-bottom: 8px;">• Engage with other writers through comments</li>
          <li style="margin-bottom: 8px;">• Explore content across various categories</li>
        </ul>
      </div>

      <p style="font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
        If you have any questions, feel free to reach out to our support team.
      </p>

      <div style="margin-top: 30px; color: #666;">
        <p style="margin-bottom: 5px;">Best regards,</p>
        <p style="font-weight: bold;">The BlogSpace Team</p>
      </div>
    </div>
  `;

  await sendEmail(to, subject, content);
};

export const resetPasswordEmail = async (
  to: string,
  username: string,
  cryptedPassword: string
) => {
  const subject = "Reset your password";
  const link = `${process.env.FRONTEND_URL}/reset-password/${cryptedPassword}`;
  const content = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333; background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
      <h2 style="color: #2c3e50; margin-bottom: 30px; text-align: center; font-size: 24px;">Reset Your Password</h2>
      
      <p style="font-size: 16px; line-height: 1.6; margin-bottom: 25px;">
      Dear ${username},
      </p>
      
      <div style="text-align: center; margin: 35px 0;">
      <a href="${link}" style="background: linear-gradient(to right, #3498db, #2980b9); color: white; padding: 14px 28px; text-decoration: none; border-radius: 50px; font-weight: bold; display: inline-block; transition: all 0.3s ease;">Reset Password</a>
      </div>
      <p style="font-size: 14px; line-height: 1.4; margin: 0; color: #666;">or copy and paste the link in your browser:</p>
      <p style="font-size: 14px; line-height: 1.4; margin: 0; color: #3498db;">${link}</p>
      
      <div style="background-color: #fff; padding: 15px; border-radius: 8px; border-left: 4px solid #e74c3c; margin: 20px 0;">
      <p style="font-size: 14px; line-height: 1.4; margin: 0; color: #e74c3c;">
      Didn't request this? Please ignore or contact support.
      </p>
      </div>
      
      <p style="font-size: 13px; color: #666; text-align: center; margin-top: 25px;">
      Link expires in 1 hour
      </p>
      
      <div style="margin-top: 25px; text-align: center; color: #666;">
      <p style="font-weight: bold;">BlogSpace Team</p>
      </div>
      </div>
      `;
  await sendEmail(to, subject, content);
};

export const contactEmail = async (
  firstName: string,
  lastName: string,
  email: string,
  subject: string,
  message: string
) => {
  const content = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333; background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
          <h2 style="color: #2c3e50; margin-bottom: 30px; text-align: center; font-size: 24px;">Contact Form Submission</h2>
          
          <div style="background-color: #fff; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <p style="font-size: 16px; line-height: 1.6; margin-bottom: 15px;">
              <strong>From:</strong> ${firstName} ${lastName} 
              <p style="color: #3498db;" >(${email})</p>
            </p>
            <div style="background-color: #f8f9fa; padding: 15px; border-radius: 8px; border-left: 4px solid #3498db;">
              <p style="font-size: 16px; line-height: 1.6; margin: 0;">${message}</p>
            </div>
          </div>
    
          <div style="margin-top: 25px; text-align: center; color: #666;">
            <p style="font-weight: bold;">BlogSpace Team</p>
          </div>
        </div>
      `;
  await recieveEmail(email, subject, content);
};
