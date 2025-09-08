# Zapier LinkedIn Scheduler Setup Guide

## Step-by-Step Instructions

### Step 1: Create a Zapier Account
1. Go to [zapier.com](https://zapier.com)
2. Sign up for free account (100 tasks/month included)
3. Verify your email

### Step 2: Create a New Zap
1. Click "Create Zap" in your Zapier dashboard
2. Name your Zap: "LinkedIn Post Scheduler"

### Step 3: Set Up the Trigger (Webhook)
1. **Choose App**: Search for "Webhooks by Zapier"
2. **Choose Trigger**: Select "Catch Hook"
3. **Set Up Trigger**: 
   - Click "Continue" 
   - Copy the webhook URL (you'll need this!)
   - Example: `https://hooks.zapier.com/hooks/catch/123456/abcdef/`

### Step 4: Test the Webhook
1. In your PostPro AI app, go to the scheduler
2. Paste the webhook URL you copied
3. Schedule a test post
4. Return to Zapier and click "Test Trigger"
5. You should see the test data from your app

### Step 5: Set Up LinkedIn Action
1. **Choose App**: Search for "LinkedIn"
2. **Choose Action**: Select "Share Update"
3. **Connect Account**: 
   - Click "Sign in to LinkedIn"
   - Authorize Zapier to access your LinkedIn
   - Choose your LinkedIn page/profile

### Step 6: Map the Data Fields
1. **Message**: Map to `content` from the webhook
2. **Scheduled Time**: Map to `scheduled_time` from webhook
3. **Link**: Optional - can map custom URLs

### Step 7: Test Your Integration
1. Click "Test & Continue"
2. Check if the test post appears on LinkedIn
3. If successful, turn on your Zap!

### Step 8: Using the Scheduler
1. In PostPro AI, enhance your post
2. Click "Schedule" button
3. Enter your Zapier webhook URL
4. Set date/time for posting
5. Click "Schedule" - your post will be sent to LinkedIn automatically!

## Pro Tips

### Save Your Webhook URL
- Save the webhook URL in your browser or notes
- You can reuse the same URL for multiple posts
- Each user needs their own webhook URL

### Timezone Settings
- Zapier uses the timezone from your scheduled_time
- Make sure your local time matches what you want
- LinkedIn will post at the exact time you specify

### Multiple Platforms
You can extend this to other platforms:
- **Twitter**: Add Twitter action to the same Zap
- **Facebook**: Add Facebook Pages action
- **Instagram**: Use Buffer or Hootsuite integrations

### Advanced Features
- **Recurring Posts**: Use Zapier's scheduler for repeat posts
- **Content Variations**: Create multiple Zaps for different post types
- **Analytics Tracking**: Add Google Sheets action to log all posts

## Troubleshooting

### Common Issues
1. **"Webhook not found"**: Check the URL is copied correctly
2. **"LinkedIn not posting"**: Verify LinkedIn account is properly connected
3. **"Wrong timezone"**: Ensure your datetime format includes timezone

### Error Messages
- **401 Unauthorized**: Reconnect your LinkedIn account
- **400 Bad Request**: Check your post content isn't too long
- **Rate Limit**: LinkedIn has posting limits (few posts per hour)

### Support
- Zapier has excellent documentation and support
- LinkedIn API limits: ~25 posts per day for personal profiles
- Business pages have higher limits

## Pricing
- **Zapier Free**: 100 tasks/month (perfect for most users)
- **Zapier Starter**: $19.99/month (750 tasks)
- Each scheduled post = 1 task
- Most users will never exceed the free limit

## Security
- Webhook URLs are secure and encrypted
- Only your app can send data to your webhook
- LinkedIn OAuth is handled securely by Zapier
- No passwords or sensitive data stored

This setup gives you professional LinkedIn scheduling with zero development complexity!