# Packing Approval System

A comprehensive multilingual web application built with Next.js 16 for managing packing guidelines and approvals across different countries and categories. The system provides role-based access control, internationalization support, and dynamic PDF generation capabilities.

## 🚀 Features

### Core Functionality

- **Multilingual Support**: Full internationalization with Arabic (RTL) and English (LTR) language support
- **Role-Based Access Control**: Three-tier permission system (Admin, Moderator, User) with granular permissions
- **Country Management**: Add and manage country-specific packing guidelines with custom accounts and labels
- **Category Management**: Organize packing methods by categories with multilingual names
- **Packing Methods**: Comprehensive CRUD operations for packing guidelines with image support
- **PDF Generation**: Dynamic PDF export functionality for packing guidelines
- **History Tracking**: Complete audit trail of packing method changes and additions

### User Management

- **Authentication System**: Secure login/logout with session management
- **User Registration**: Admin-controlled user creation with role assignment
- **Password Management**: Forgot password and reset password functionality
- **Profile Management**: User profile editing and password change capabilities
- **User Administration**: Complete user management dashboard for administrators

### Advanced Features

- **Responsive Design**: Mobile-first responsive design with Tailwind CSS
- **Dark Mode Support**: System-wide dark/light theme toggle
- **File Upload**: Image upload functionality with proper validation
- **Search & Filtering**: Advanced filtering capabilities for historical data
- **Real-time Notifications**: Toast notifications for user feedback

## 🛠 Technologies Used

### Frontend

- **Next.js 16.1.1**: React framework with App Router and Turbopack
- **React 19.2.3**: Latest React with concurrent features
- **TypeScript 5.9.3**: Type-safe development
- **Tailwind CSS 4.1.18**: Utility-first CSS framework
- **React Hot Toast 2.6.0**: Toast notification system
- **React Icons 5.5.0**: Comprehensive icon library
- **React Select 5.10.2**: Advanced select components
- **Next Themes 0.4.6**: Dark/light mode management

### Backend & Database

- **Supabase**: PostgreSQL database with real-time capabilities
- **Server Actions**: Next.js server-side form handling
- **Server Components**: Server-side rendering capabilities
- **Cloudinary**: Image upload and optimization service
- **Zod 4.3.2**: Runtime type validation

### PDF & File Handling

- **@react-pdf/renderer**: Dynamic PDF generation
- **Next Cloudinary**: Image upload and transformation
- **File System API**: File handling and uploads

### Internationalization

- **@formatjs/intl-localematcher**: Locale matching
- **Negotiator**: Content negotiation for i18n
- **RTL Support**: Right-to-left language support for Arabic
- **Dynamic Font Loading**: Google Fonts (Cairo, Roboto) integration

### Development Tools

- **ESLint 9.39.2**: Code linting with Next.js config
- **Prettier 3.7.4**: Code formatting with Tailwind plugin
- **TypeScript 5.9.3**: Static type checking
- **Turbopack**: Fast bundler for development
- **Date-fns 4.1.0**: Modern date utility library

## 📋 Prerequisites

- Node.js 20.0 or higher
- npm or yarn package manager
- Supabase account for database
- Cloudinary account for image management
- Modern web browser with JavaScript enabled

## 🚀 Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/packing-approval-system.git
   cd packing-approval-system
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   ```

   Configure your environment variables in `.env.local`

4. **Run the development server (with Turbopack)**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗 Project Structure

```
src/
├── app/
│   ├── [lang]/                 # Internationalized routes
│   │   ├── category/          # Category management
│   │   ├── country/           # Country management
│   │   ├── packing-way/       # Packing methods
│   │   ├── user/              # User management
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Home page
│   └── layout.tsx             # App layout
├── components/                 # Reusable components
│   ├── form/                  # Form components
│   ├── header/                # Header components
│   ├── sidebar/               # Sidebar navigation
│   ├── profile/               # Profile components
│   └── table/                 # Table components
├── context/                   # React contexts
├── lib/                       # Utility functions
├── server/                    # Server-side logic
├── type/                      # TypeScript interfaces
└── i18n.config.ts            # Internationalization config
```

## 🔧 Usage

### Authentication

1. Navigate to `/[lang]/user/signin` to log in
2. Use forgot password functionality if needed
3. Admins can create new users via `/[lang]/user/signup`

### Managing Countries

1. Access `/[lang]/country/add` to add new countries
2. Configure account names, labels, and flag images
3. View country-specific packing methods at `/[lang]/country/[countryData]`

### Managing Categories

1. Use `/[lang]/category/add` to create new categories
2. Categories support multilingual names (English/Arabic)
3. Categories help organize packing methods

### Managing Packing Methods

1. Add new packing guidelines at `/[lang]/packing-way/add`
2. Associate methods with countries and categories
3. Upload images and provide multilingual descriptions
4. Edit existing methods via `/[lang]/packing-way/update/[itemId]`

### Viewing History

- Access `/[lang]/country/history` for complete audit trail
- Filter and sort historical data
- Track all changes and additions

## 🌐 Internationalization

The application supports two languages:

- **English (en)**: Left-to-right layout with Roboto font
- **Arabic (ar)**: Right-to-left layout with Cairo font

Language switching is handled automatically based on the URL structure: `/en/...` or `/ar/...`

## 🔐 Permissions System

### Admin

- Full system access
- User management
- All CRUD operations

### Moderator

- Limited administrative access
- Content management
- No user creation

### User

- View access only
- Profile management
- Basic functionality

## 🎨 Styling

The application uses Tailwind CSS with custom components:

- **Header styling**: Custom header with decorative elements
- **Dark mode**: Full dark/light theme support
- **Responsive design**: Mobile-first approach
- **Custom fonts**: Language-specific font loading

## 📱 Responsive Design

- **Mobile-first**: Optimized for mobile devices
- **Tablet support**: Adaptive layouts for medium screens
- **Desktop**: Full-featured desktop experience
- **Sidebar**: Collapsible navigation on smaller screens

## 🔧 Development

### Scripts

```bash
npm run dev          # Start development server with Turbopack
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Code Style

- TypeScript for type safety
- ESLint for code linting
- Consistent file naming conventions
- Component-based architecture

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Contribution Guidelines

- Follow existing code style and conventions
- Add TypeScript types for new features
- Test multilingual functionality
- Ensure responsive design compatibility
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:

- Create an issue on GitHub
- Check existing documentation
- Review the codebase for implementation examples

## 🔮 Future Enhancements

- Database integration
- Real-time notifications
- Advanced reporting features
- API endpoints for external integrations
- Enhanced file management
- Bulk operations support

---

Built with ❤️ using Next.js 16 and TypeScript
