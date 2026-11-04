# SkillNest – Open Course-ware and Technical Skill Development Platform

SkillNest – open course-ware & technical skill development platform (MERN stack). Course management, code playground, hackathon challenges, quizzes, and forum Q&A. CA1 group project, SWT22022 (IAD).

[![Group ID](https://img.shields.io/badge/Group-Group%20B-blue)](https://github.com)
[![Course](https://img.shields.io/badge/Course-SWT22022%20Practical%20for%20IAD-green)](https://github.com)
[![Member](https://img.shields.io/badge/Member%2001-L.M.R.C.Bandara%20(SEU%2FIS%2F22%2FICT%2F113)-indigo)](https://github.com)
[![Stack](https://img.shields.io/badge/Stack-MERN%20(MongoDB,%20Express,%20React,%20Node)-orange)](https://github.com)

**South Eastern University of Sri Lanka**  
**Department of Interdisciplinary Studies, Faculty of Applied Sciences**  
**SWT22022 Practical for Internet Application Development**  
**Proposal for CA1 Group Assignment — Group B**

---

## 👨‍💻 Primary Module Contributor
- **Member 01:** L.M.R.C.Bandara (`SEU/IS/22/ICT/113`)
- **Assigned Module:** **Module 1 – Course & Learning Material Management**
- **Complexity / Contribution:** High — Course creation, curriculum structure management, multi-format learning material uploads, role-based access control, learner viewing, and integration with the Module 02 Approval Workflow.

---

## 📋 Module 1 Architecture & Specifications

### 1. Backend Responsibilities (Node.js + Express + MongoDB)
- **Course Lifecycle Management**: Full CRUD on courses (`draft`, `pending_approval`, `approved`, `rejected`).
- **Course Structures / Topics**: Sequential syllabus chapters/topics with estimated durations and reordering capabilities.
- **Learning Materials**: Multi-format attachment support:
  - 🎥 Video Lectures (YouTube streams, external video links, or MP4 uploads)
  - 📝 Lecture Notes (Rich Markdown content rendering)
  - 💻 Code Snippets & Solutions (Language selection: JavaScript, Java, Python, SQL, C++)
  - 📄 Documents (PDF guides & external reference documentation)
- **Module 02 Integration Contract**:
  - `PATCH /api/courses/:id/submit`: Instructor submits course for administrator approval (requires $\ge 1$ topic and $\ge 1$ learning material).
  - `PATCH /api/courses/:id/status`: Administrator approves or rejects course with review feedback.
- **Security & Authorization**: JWT token authentication with RBAC middleware restricting course modification to instructor owners and platform admins.

### 2. Frontend Responsibilities (React 18 + Vite + Tailwind CSS)
- **Learner Catalog & Search**: Real-time keyword search, category filtering chips, difficulty level filter, and course cards with topic count and rating.
- **Course Detail & Syllabus Room**: Topic accordion list displaying nested learning materials with custom type icons and durations.
- **Interactive Material Viewer Modal**: Modal supporting live YouTube embed player, markdown notes reading, copyable code snippets with syntax styling, and external link handling.
- **Instructor Studio Dashboard**:
  - Metric counters (Total Courses, Published, In Review, Drafts).
  - Status tabs (`All`, `Drafts`, `Under Review`, `Published`, `Needs Revision`).
  - Action buttons (Curriculum Builder, Edit Details, Learner Preview, Submit for Approval, Delete).
  - Admin feedback display for rejected courses.
- **Course Creator & Metadata Editor**: Form with live thumbnail previews, category selections, dynamic prerequisites list, and learning outcomes list.
- **Curriculum Builder**:
  - Add syllabus topics with estimated duration.
  - Attach learning materials per topic (Video, Notes, Code snippet, Document).
  - In-place preview of attached materials.
  - One-click submission for Administrator Review with validation checks.

---

## 🗄️ MongoDB Database Design (Module 1 Collections)

### 1. `courses` Collection
| Field | Type | Description |
|---|---|---|
| `_id` | ObjectId | Unique identifier |
| `title` | String | Course title (required, max 120 chars) |
| `subtitle` | String | Short summary subtitle |
| `description` | String | Full course description |
| `category` | String | Category enum (Web Development, Programming, etc.) |
| `level` | String | Beginner, Intermediate, Advanced, All Levels |
| `thumbnail` | String | URL to thumbnail banner |
| `instructor` | ObjectId (Ref: User) | User ID of the instructor who authored the course |
| `status` | String | `draft`, `pending_approval`, `approved`, `rejected` |
| `prerequisites` | Array of String | Key prerequisites required |
| `learningOutcomes`| Array of String | Competencies gained upon completion |
| `submissionDate` | Date | Timestamp of submission for review |
| `rejectionReason`| String | Administrator feedback if rejected |

### 2. `coursestructures` (Topics) Collection
| Field | Type | Description |
|---|---|---|
| `_id` | ObjectId | Unique identifier |
| `course` | ObjectId (Ref: Course) | Parent course |
| `title` | String | Topic / unit title |
| `description` | String | Scope of this chapter |
| `order` | Number | Sequential position in syllabus |
| `durationMinutes`| Number | Estimated completion time |

### 3. `learningmaterials` Collection
| Field | Type | Description |
|---|---|---|
| `_id` | ObjectId | Unique identifier |
| `course` | ObjectId (Ref: Course) | Parent course |
| `topic` | ObjectId (Ref: CourseStructure) | Parent syllabus topic |
| `title` | String | Material title |
| `materialType` | String | `video`, `notes`, `code`, `document` |
| `resourceLocation`| String | URL or uploaded filepath |
| `content` | String | Markdown notes text or code snippet |
| `codeLanguage` | String | Language for syntax highlighting (js, java, py, etc.) |
| `durationMinutes`| Number | Estimated reading/watching duration |

---

## 🚀 Running the Project Locally

### Prerequisites
- Node.js (v18 or higher)
- MongoDB running locally on `mongodb://localhost:27017` or MongoDB Atlas URI

### 1. Backend Setup
```bash
cd backend
npm install
npm run seed     # Seeds demo users (Instructor, Learner, Admin) & sample courses
npm run dev      # Starts Express API server on http://localhost:5000
```

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev      # Starts Vite React development server on http://localhost:5173
```

Open your browser at `http://localhost:5173`.
