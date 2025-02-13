# Packing Guide Web Application

A bilingual (English/Arabic) web application designed to guide users through standardized packing methods used in factory operations. This application helps ensure consistent quality, efficiency, and proper handling of products during the packing process.

## Features

- **Bilingual Support**: Full English and Arabic language support throughout the application
- **User Authentication**: Secure login and registration system with role-based access control
- **Role Management**: Three user roles (User, Moderator, Admin) with different permissions
- **Packing Methods**:
  - Add, edit, and delete packing instructions
  - Visual guidance with image support
  - Categorization by country and packing type
- **History Tracking**: Complete audit trail of all packing method changes
- **Country Management**: Add and manage country-specific packing requirements
- **Category System**: Organize packing methods by categories
- **Profile Management**: User profile customization with avatar support
- **Theme Support**: Light and dark mode options

## Technology Stack

- **Frontend**: Next.js with TypeScript
- **Backend**: Supabase (Authentication, Database)
- **Image Storage**: Cloudinary
- **Styling**: Tailwind CSS
- **Internationalization**: Built-in i18n support

## User Roles and Permissions

### User

- View packing history
- Create packing methods
- Update packing methods

### Moderator

All User permissions plus:

- Create countries
- Create categories

### Admin

All Moderator permissions plus:

- Manage users
- Update user roles
- Delete users
