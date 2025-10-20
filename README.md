# Agrigistics Demo

A modern Angular-based application for agricultural business management, featuring payroll management, dashboard analytics, and data visualization components.

## Features

- Interactive Dashboard
- Payroll Management System
- Data Tables with Sorting and Filtering
- Overview Cards for Quick Statistics
- Search Functionality
- Responsive Side Navigation

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v20.12.2 or higher)
- [npm](https://www.npmjs.com/) (v10.6.0 or higher)
- [Git](https://git-scm.com/) for version control

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/juankotze/agrigistics-demo.git
   cd agrigistics-demo
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Development

### Starting the Development Server

Run the development server:
```bash
npm start
```
or
```bash
ng serve
```

Navigate to `http://localhost:4200/` in your browser. The application will automatically reload if you change any of the source files.

### Building for Production

To build the project for production:
```bash
npm run build
```
or
```bash
ng build
```

The build artifacts will be stored in the `dist/` directory.

## Project Structure

```
src/
├── app/                    # Application source code
│   ├── dashboard/         # Dashboard component
│   ├── left-sidenav/     # Navigation component
│   ├── payroll/          # Payroll management module
│   └── shared/           # Shared components and utilities
├── assets/               # Static files and mock data
└── styles.scss          # Global styles
```

## Testing

### Running Unit Tests

Execute unit tests via [Karma](https://karma-runner.github.io):
```bash
npm test
```
or
```bash
ng test
```

### Code Scaffolding

Generate new components, services, pipes, and more:
```bash
ng generate component component-name
ng generate service service-name
ng generate pipe pipe-name
```

## Technical Stack

- Angular 19
- TypeScript 5.8
- Bootstrap Icons
- Material Icons
- RxJS

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Further Help

- For Angular CLI help: `ng help`
- [Angular Documentation](https://angular.dev/)
- [Angular CLI Overview and Command Reference](https://angular.io/cli)

## Version

Current Version: 0.0.0
Angular Version: 19.2.15
