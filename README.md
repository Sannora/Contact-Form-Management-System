**Contact Form Management System ✉️📝**

A contact form managament system web app project that I've developed during my internship at OBSS Teknoloji

**Description**

This is a React web app that is basic contact form management system. The app has features of authentication and state management. The app has two user roles; reader and admin. Users submit basic contact forms including the name, message, country and gender information. They are listed in the messages page and each message can be displayed separately and marked as read when they are seen. App also has admin utilities of deleting and updating users and displaying the user list in the users page. Users have name, password and image attributes. There is also a reports page where the admin users can see the visual distrubution of users according to their country and gender visualised as charts. App also has not found and not authorized pages.

For UI development I've used Material UI for the first time both to achieve a simple, modern look following the material approach and to learn and practice a common UI library. For the data visualisation I've used Recharts library.

**Features**

  Authentication

I used *JSON Web Token*s to provide authentication. The token is sent to browser's local storage and is stored there when a user logs in by making an *axios* request, then when user tries to access a protected route that require authentication another *axios* request is sent with the token as its header and backend decides whether if user is authenticated or not.

  State Management

State management of the app is handled by Redux. It contains a `UserSlice` that stores the initial user states and user reducers and is distributed through the app components.

  Contact Form

Form info contains the fields of name, message, country and gender. Each one of them is required to proceed and the app throws error handling messages in cases of errors. The countries field options are populated using the pre-provided *countries.json* document that contains every country in the selection field and they are accessed using an *axios* request and mapped using `.map` function.

  Messages

Messages submitted by users are first added to the *messages.json* document in the backend using an `axios.post` request. Then they are accessed in the *Messages* component via another *axios* request and listed inside the component. Each message contains a read info that is marked as read when a user accesses that particular message. Read messages are indicated with a darker message card background and an eye icon where unread have lighter background with a notification icon. Each message can be reached as single message showing the whole message, its sender details and to mark as read.

  Users

Users in the app are stored in the *users.json* document in the backend and they are listed in the *Users* component that can only be accessed by an admin user. Admin users are marked with a highlighted background and they can also update or add new users to the app in that interface. Unfortunately newly added users' profile pictures have an issue and they can not be seen in some cases. It is due to the required format of the profile pictures are *base64* images and I unfortunately couldn't manage to handle the proper formatting logic.

  Reports

Admin users can reach a basic visualisation of the user messages' data reports in this component. Gender and the country information of the message owners' are visualised as graphs of bar and pie charts.

**Screenshots with Mobile Views**

Login Page:

![login](https://github.com/user-attachments/assets/1ac9f1da-c741-4b64-b528-37c83dcef048)
![login-mobile](https://github.com/user-attachments/assets/3ab636be-30e9-4c26-9e2f-cb053677785d)

Home and Header:

![home](https://github.com/user-attachments/assets/df40d1a4-2150-4e89-b004-126be4af2634)
![home-mobile](https://github.com/user-attachments/assets/04e72e45-5ad5-4fda-8ce7-2b8439399ead)
![header-mobile](https://github.com/user-attachments/assets/2a0ad485-9ee4-49a2-b6d4-c18dcfcecce5)

Messages:

![messages](https://github.com/user-attachments/assets/635b3a9f-9967-42e7-bee4-3c4eef121b0e)
![messages-mobile](https://github.com/user-attachments/assets/fb602713-ac4b-4eae-b4c5-5362c1f34f60)

Users:

![users](https://github.com/user-attachments/assets/49594837-cb62-4822-a9fc-8b26cc437213)
![users-mobile](https://github.com/user-attachments/assets/4d7c3f47-ad64-4d9c-b4e0-a3a69616dd84)

Add New User:

![add-new-user](https://github.com/user-attachments/assets/e918ae5a-2112-4c92-8020-d2caba15ec59)

Reports:

![reports](https://github.com/user-attachments/assets/ae58c3e8-f3f3-4331-948d-186dad54cc65)
![reports-mobile1](https://github.com/user-attachments/assets/7e9a8be9-d14b-4005-888c-d98d38a851cd)
![reports-mobile2](https://github.com/user-attachments/assets/eb426266-1a18-4e72-89a6-1cc56b593b7f)
