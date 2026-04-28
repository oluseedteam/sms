# GHRA School Management System

A full-featured School Management System built for the Nigerian school model, with role-based dashboards for **Admin**, **Teacher**, and **Student**.

---

## Tech Stack

| Layer     | Technology                          |
|-----------|-------------------------------------|
| Frontend  | React + Vite, TailwindCSS, Framer Motion |
| Backend   | Laravel 11 (PHP 8.2+), Sanctum Auth |
| Database  | MySQL                               |
| Hosting   | cPanel (api.ghra.org.ng)             |

---

## Environment Setup

### Frontend (.env)
```env
# Local development
VITE_API_BASE_URL=http://127.0.0.1:8000/api

# Production (cPanel)
# VITE_API_BASE_URL=https://api.ghra.org.ng/api
```

### Backend (.env key settings)
```env
APP_NAME=GHRASchool
APP_ENV=local
APP_URL=http://localhost

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=template
DB_USERNAME=root
DB_PASSWORD=
```

### Production Database (cPanel)
```env
DB_CONNECTION=mysql
DB_HOST=localhost
DB_PORT=3306
DB_DATABASE=your_cpanel_db_name
DB_USERNAME=your_cpanel_db_user
DB_PASSWORD=your_cpanel_db_password
```

---

## Running Locally

### Backend
```bash
cd smsback/smsback
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve
```

### Frontend
```bash
cd sms
npm install
# Set VITE_API_BASE_URL=http://127.0.0.1:8000/api in .env
npm run dev
```

---

## Nigerian School Model

### Class Structure
| Level | Classes |
|-------|---------|
| JSS 1 | JSS 1A, JSS 1B |
| JSS 2 | JSS 2A, JSS 2B |
| JSS 3 | JSS 3A, JSS 3B |
| SS 1  | SS 1 Science, SS 1 Art, SS 1 Commercial |
| SS 2  | SS 2 Science, SS 2 Art, SS 2 Commercial |
| SS 3  | SS 3 Science, SS 3 Art, SS 3 Commercial |

### Student Departments
Students choose one of three departments upon registration:
- **Science** 🔬
- **Art** 🎨
- **Commercial** 💼

---

## API Endpoints

Base URL: `VITE_API_BASE_URL` (default: `https://api.ghra.org.ng/api`)

### Authentication (Public)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/register` | Register student or teacher |
| POST | `/auth/login` | Login (email or role ID) |
| POST | `/auth/forgot-password` | Send password reset link |
| POST | `/auth/reset-password` | Reset password with token |

### Authentication (Authenticated)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/logout` | Revoke token |
| PATCH | `/auth/profile` | Update profile picture |

### Dashboard (All Roles)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/dashboard/summary` | Role-specific dashboard summary |

**Student summary includes:** `my_classes`, `attendance_rate`, `average_score_percent`, `subjects_tracked`, `star_student`, `achievement_points`, `upcoming_events`

**Teacher summary includes:** `my_classes`, `my_students`, `attendance_today`, `results_entered`

**Admin summary includes:** `total_students`, `total_teachers`, `total_workers`, `total_prefects`, `total_classes`, `total_subjects`, `attendance_today`, `attendance_history`

### Classes (Read: All Authenticated | Write: Admin)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/classes` | List all classes |
| GET | `/classes/{id}` | Get class with students/subjects |
| POST | `/classes` | Create class (Admin) |
| PUT | `/classes/{id}` | Update class (Admin) |
| DELETE | `/classes/{id}` | Delete class (Admin) |

### Subjects (Read: All Authenticated | Write: Admin)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/subjects` | List all subjects |
| GET | `/subjects/{id}` | Get subject details |
| POST | `/subjects` | Create subject (Admin) |
| PUT | `/subjects/{id}` | Update subject (Admin) |
| DELETE | `/subjects/{id}` | Delete subject (Admin) |

### Attendance (Admin & Teacher)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/attendance` | List attendance records (filterable) |
| POST | `/attendance/bulk` | Save bulk attendance |
| PATCH | `/attendance/{id}` | Update single record |

### Student Attendance
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/my/attendance` | Student's own attendance |
| GET | `/my/results` | Student's own results |

### Results (Admin & Teacher)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/results` | List results |
| POST | `/results` | Create result |
| PATCH | `/results/{id}` | Update result |
| DELETE | `/results/{id}` | Delete result |

### Assignments (All Authenticated)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/assignments` | List assignments (role-filtered) |
| POST | `/assignments` | Create assignment |
| GET | `/assignments/{id}` | Get assignment |
| PATCH | `/assignments/{id}` | Update assignment |
| DELETE | `/assignments/{id}` | Delete assignment |

### Messages (All Authenticated)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/messages` | List messages |
| POST | `/messages` | Send message |
| GET | `/messages/{id}` | Get message |
| PATCH | `/messages/{id}` | Update message |
| DELETE | `/messages/{id}` | Delete message |

### Resources (All Authenticated)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/resources` | List resources |
| POST | `/resources` | Create resource |
| GET | `/resources/{id}` | Get resource |
| PATCH | `/resources/{id}` | Update resource |
| DELETE | `/resources/{id}` | Delete resource |

### Calendar Events (All Authenticated)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/calendar-events` | List events |
| POST | `/calendar-events` | Create event |
| GET | `/calendar-events/{id}` | Get event |
| PATCH | `/calendar-events/{id}` | Update event |
| DELETE | `/calendar-events/{id}` | Delete event |

### Teacher Classes (All Authenticated)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/teacher-classes` | List teacher's scheduled classes |
| POST | `/teacher-classes` | Create teacher class |
| PATCH | `/teacher-classes/{id}` | Update teacher class |
| DELETE | `/teacher-classes/{id}` | Delete teacher class |

### Admin Logs (Admin Only)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/logs` | View system logs |
| DELETE | `/logs` | Clear system logs |

### User Management (Admin Only)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/users` | List all users |
| POST | `/users` | Create user |
| GET | `/users/{role}/{id}` | Get user details |
| PATCH | `/users/{role}/{id}` | Update user |
| DELETE | `/users/{role}/{id}` | Delete user |

---

## Frontend Service Layer

All API calls go through `src/services/api.js` which:
- Reads `VITE_API_BASE_URL` from `.env`
- Attaches Bearer token from localStorage
- Handles error responses consistently

### Services:
| Service | File | Endpoints Used |
|---------|------|----------------|
| Auth | `authService.js` | `/auth/register`, `/auth/login`, `/auth/profile` |
| Dashboard | `dashboardService.js` | `/dashboard/summary` |
| Classes | `classService.js` | `/classes` CRUD |
| Subjects | `subjectService.js` | `/subjects` CRUD |
| Assignments | `assignmentService.js` | `/assignments` CRUD |
| Attendance | `attendanceService.js` | `/attendance`, `/attendance/bulk` |
| Teacher Classes | `teacherClassService.js` | `/teacher-classes` CRUD |

---

## Deployment to cPanel

1. **Backend**: Upload `smsback/smsback` to server, configure `.env` with production DB credentials
2. **Frontend**: Run `npm run build`, upload `dist/` to public_html
3. **Database**: Import migrations: `php artisan migrate`
4. **.htaccess**: Ensure SPA routing is configured for the frontend

---

## Default Admin Login
- **Username**: `admin`
- **Password**: `admin`
