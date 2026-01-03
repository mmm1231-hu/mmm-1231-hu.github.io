### Release [5.11.0] **→ (Current)**

`update time : 2025-01-XX`

#### Technical Updates

- Added SystemSettings model with singleton pattern
- Created system settings service and controller
- Implemented settings validation schema
- Added public GET and admin-only PUT routes for settings
- Frontend store and management page for system configuration

#### Description

> **System Settings Management:**  
> This update introduces a centralized system settings feature for application-wide configuration.
> Stores data like current stream link, site name, maintenance mode, and welcome message.
> Settings are stored as a single document in the database and can be updated by admins.
> Public users can view settings, but only admins can modify them.

---

### Release [5.10.7]

`update time : 2025-10-22`

#### Technical Updates

- Added complete CRUD operations for rules management
- Created Rule model with title and description fields
- Implemented rule validation schemas
- Added rule service, controller, and router
- Public routes for viewing rules, admin-only routes for management

#### Description

> **Rules Management System:**  
> This update introduces a complete rules management system similar to the streamer feature.
> Users can view all rules, while admins can create, update, and delete rules.
> Each rule contains a title and description, with support for pagination and filtering.

---

### Release [5.10.6]

`update time : 2025-10-21`

#### Technical Updates

- enhance and fix error in update profile endpoint for all user roles
- handle profile picture upload and update correctly in user profile update endpoint to rturn the correct URL after updating the profile picture

#### Description

> no changes in functionality

---

### Release [5.10.5]

`update time : 2025-10-17`

#### Technical Updates

- Fixed super-admin endpoint - to enable creation of super-admin with correct fields
- enabled parent registration without authentication (parent self-registration)

#### Description

> **Update Users Profiles**  
> fix the endpoint `GET /api/profile` to return fixed fields for all user roles
>
> - [x] super-admin profile
> - [x] admin profile
> - [x] school-admin profile
> - [x] teacher profile
> - [x] student profile
> - [x] parent profile

---

### Release [5.10.4]

`update time : 2025-10-10`

#### Changed

- Added endpoint to retrieve the daily form
- Added service method to fetch the daily form from the database
- Added endpoint to retrieve school responses statistics by date range
- Added service method to aggregate and return response statistics for a school

#### Description

> **Daily Form Functionality:**  
> in this update, we have added a new feature to get the daily status form students need to fill out every day
> and this will help teachers and schools to monitor the daily mood their students
>
> in admin/school panel, we have added statistics for the responses submitted by students and we compare them by the previous day
> and show the differences in percentages for each question **(trend)**

---

### Release [5.10.3]

`update time : 2025-10-09`

#### Changed

- return first_email field to the student profile response
- Updated Mongoose population to include the `user` field for retrieving the email
- Enhanced `ecosystem.config.js` to include shared directories for `uploads` and `logs` to ensure persistent storage across deployments
- Added validation to ensure that the `subject` field does not contain spaces
- Added endpoints for SubTeachers to retrieve class lists and student information

#### Description

> **SubTeacher Functionality:**  
> enable to add more teachers to a class and allow them to access student information
> for each class initially created by the main teacher
> we can add multiple teachers to a class and they can access the students in that class or remove them

---

### Release [5.10.2]

`update time : 2025-10-07`

#### Changed

- Added environment configuration for production deployment

#### Description

> **Application Name:** `Production-Backend`  
> **Deployment:** Managed with `pm2` for smooth production operation  
> **Port:** `4000`
>
> This update changes the application name to "Production-Backend" and adds environment configuration for production deployment.  
> The application is managed using pm2 to ensure reliability in a production environment and runs on port 4000.

---

### Release [5.10.1]

`update time : 2025-10-06`

#### Changed

- enabled teachers to add multiple teachers to a class
- enabled sub-teachers to view class students and their information

#### Description

> **Sub-Teacher Functionality:**
> This update introduces the ability for sub-teachers to access and manage their assigned classes more effectively. Sub-teachers can now view class lists, student information, and contribute to the teaching process without needing full teacher permissions.
