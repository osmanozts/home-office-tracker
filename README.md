# Home Office Time Tracker

> 🇩🇪 Für die deutsche Version siehe [README.de.md](./README.de.md)

This is a web application designed to help employees track their working hours in a home office environment. Built with Next.js, Supabase, and Resend.

The implementation was completed within a focused 6–8 hour window, prioritizing high efficiency without compromising on code quality or structural clarity.

## How it works

Here’s a breakdown of how the core features work:

### Authentication

The application requires users to sign in before accessing any functionality. You can test the app using the following pre-registered demo accounts:

- **Email**: test@mail.de  
  **Password**: pw12345

- **Email**: test2@mail.de  
  **Password**: pw12345

These accounts are already set up in the Supabase auth system and are linked to corresponding employee records.

If new accounts are registered tha application triggers a postgres function which adds the user credentials from the auth.users table to the public.employees table.

### Active Session

When a user starts a session, a new record is created in the `homeoffice_sessions` table, and the start time is stored. The session will remain active until the user decides to stop it, at which point the session end time is updated.

On session stop, an email is sent to notify the configured recipient email with session details, including the start time, end time, and duration.

### Session History

Past sessions can be viewed in the "Session History" section. The app fetches the session data from the `homeoffice_sessions` table, displaying the session details, such as start and end times, and the duration.

## Tech Stack

The technology stack was selected with a strong focus on rapid prototyping, maintainability, and modern development standards. Given the limited implementation timeframe of roughly 6–8 hours, the tools had to offer a high level of abstraction, excellent documentation, and seamless integration.

- **Next.js**: A React-based framework that supports both frontend and backend development in a single codebase. It enables rapid development through built-in routing, API routes, and server-side rendering.
- **Supabase**: Chosen as the backend platform due to its instant Postgres setup, built-in authentication and real-time database subscriptions.
- **Resend**: Integrated for transactional email delivery (e.g., session start/stop notifications).
- **Chakra UI**: A modern and accessible component library that accelerates UI development.

## Database Structure

The database schema is designed to handle employee data, home office session tracking, and roles (future idea) for extended customizations.

### Key Tables

- **auth.users**: This table is used to authenticate users. It’s integrated with Supabase Authentication.
- **employees**: Contains employee-specific information, such as job roles, associated with a user.
- **homeoffice_sessions**: This table tracks all active and past sessions, storing details like start time, end time, duration, and user reference.
- **roles**: Future extension to manage custom user roles within the system.

## Environment Variables

The application requires several environment variables to be properly set. Please ensure the following are present in your `.env` file:

- `NEXT_PUBLIC_SUPABASE_URL`: The URL of your Supabase instance.
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: The anonymous key for accessing Supabase services.
- `NEXT_PUBLIC_MAIL_API_KEY`: Your Resend API key for sending emails.
- `NEXT_PUBLIC_SENDER_MAIL`: The email address from which the notifications are sent.
- `NEXT_PUBLIC_RECIPIENT_MAIL`: The recipient email address for notifications.

## Installation

To get started with the Home Office Time Tracker, follow the steps below:

1. Clone the repository:

```bash
git clone https://github.com/osmanozts/home-office-tracker
```

2.  Install the required dependencies:

```bash
npm install
```

3.  Set up the environment variables by creating a `.env` file at the root of the project, based on the template provided above.

4.  Set up Supabase locally:

    Download and start Supabase locally by following these steps:

        Install and start Docker (if you haven't already).
        Run:

```bash
npx supabase start.
```

Ensure your SUPABASE_URL and SUPABASE_ANON_KEY environment variables point to your local instance:

NEXT_PUBLIC_SUPABASE_URL=http://localhost:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-anon-key>

All the database schema and migrations are stored in the supabase/migrations folder. You can apply the migrations by running the appropriate Supabase CLI commands to set up the schema.

5. Start the application: npm run dev

This will start the development server, and the application will be available at `http://localhost:3000`.

## Future Enhancements

The current implementation is focused on tracking and managing home office sessions in an 6 -8 hour efficient implementation time. However, there are several areas for potential future improvements:

- **Custom User Roles**: The `roles` table can be extended to create custom roles, such as "Manager", "Human Resources" or "Admin", who may have additional permissions (e.g., viewing other employees' sessions).

- **Mobile Support**: Although this app is currently web-based, a mobile version could be developed in the future using React Native.
