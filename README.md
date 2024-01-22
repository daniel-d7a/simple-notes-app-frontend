# Angular Notes App

This notes app is built with Angular, featuring various functionalities for organizing your notes and todos.

## Features

- **Notes and Todos:** Create and manage notes and todos within the app.
- **Favorites:** Mark notes or todos as favorites for quick access.
- **Labels:** Organize your data with labels, and assign or remove them from notes or todos.
- **Optimistic Updates:** Experience smooth and responsive user interactions with optimistic updates.
- **Responsive Design:** The app is designed to work seamlessly on various screen sizes.
- **Authentication:** Secure login and sign-up functionality using JWT tokens stored in cookies.
- **Guarded Routes:** Certain routes are protected to ensure authenticated access only.
- **Pagination:** Navigate through your notes and todos efficiently with pagination.

## Technologies and Libraries

- **Angular:** The core framework for building the app.
- **ng-icons:** [Link to ng-icons](https://ng-icons.github.io/ng-icons/#/) - for icons 
- **ngx-cookie-service:** [Link to ngx-cookie-service](https://github.com/stevermeister/ngx-cookie-service#readme) - to simplify storing and retrieving the token from the cookies
- **ngx-toastr:** [Link to ngx-toastr](https://ngx-toastr.vercel.app/) - for success and error toasters
- **rxjs:** [Link to rxjs](https://rxjs.dev/) - for dealing with Observables and async data
- **Tailwind CSS:** [Link to Tailwind CSS](https://tailwindcss.com/) - for styling
- **Daisy UI:** [Link to Daisy UI](https://example.com/daisy-ui) - for ready-made, beautiful, and responsive UI components styled with tailwind
- **Typescript:** The programming language used for development.

## Getting Started

1. Clone the repository.
2. Install dependencies with `npm install`.
3. Configure your environment variables.(optional)
4. Run the development server with `ng serve`.
5. Open the app in your browser at `http://localhost:4200`.

## Contributing

If you'd like to contribute to the project, please follow our [contribution guidelines](CONTRIBUTING.md).

## License

This project is licensed under the [MIT License](LICENSE).
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.0.6.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.
