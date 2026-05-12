# Native Permission Guidance

This app should not trigger permission prompts on launch. Ask only when the user is about to use a feature that clearly needs the permission.

## Notification permission

For iOS notifications, use a custom pre-permission screen before calling the system prompt.

Recommended copy:

- Title: `Turn on notifications?`
- Body: `We'll send important reminders, activity updates, and alerts you choose. You can manage or turn these off anytime in Settings.`
- Buttons: `Not now` and `Continue`

Rules:

- Do not say notifications are required to use the app.
- Do not block the user if they deny permission.
- If promotional notifications are ever added, require separate explicit opt-in and provide an in-app opt-out.

## Camera

Ask only when the user taps a camera entry point.

Suggested pre-permission copy:

- Title: `Use your camera?`
- Body: `Take a photo or video to share in chat. You can continue without this and turn it on later in Settings.`

## Microphone

Ask only when the user taps voice or video recording.

Suggested pre-permission copy:

- Title: `Use your microphone?`
- Body: `Record voice messages and audio notes when you choose. You can continue without this and turn it on later in Settings.`

## Photos

Ask only when the user taps an attachment or gallery action.

Suggested pre-permission copy:

- Title: `Access your photos?`
- Body: `Choose photos from your library to share in chat. You can continue without this and turn it on later in Settings.`
