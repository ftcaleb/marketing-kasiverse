# Data Flow Diagrams

## Application Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                     REACT FRONTEND                           │
├──────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌─────────────────┐         ┌─────────────────┐            │
│  │  Auth Pages     │         │   Content Pages │            │
│  ├─────────────────┤         ├─────────────────┤            │
│  │  • Login        │         │  • Problems     │            │
│  │  • Signup       │         │  • Stores       │            │
│  └────────┬────────┘         └────────┬────────┘            │
│           │                           │                      │
│           └───────────┬───────────────┘                      │
│                       │                                      │
│  ┌────────────────────▼─────────────────┐                   │
│  │   API Utility Layer (lib/api.js)    │                   │
│  ├──────────────────────────────────────┤                   │
│  │  • getNotes()                        │                   │
│  │  • createNote()                      │                   │
│  │  • updateNote()                      │                   │
│  │  • deleteNote()                      │                   │
│  │  • isAuthenticated()                 │                   │
│  ├──────────────────────────────────────┤                   │
│  │  ✅ Auto-attach auth headers         │                   │
│  │  ✅ Error handling + redirects       │                   │
│  │  ✅ Token management                 │                   │
│  └────────────────────┬─────────────────┘                   │
│                       │                                      │
└───────────────────────┼──────────────────────────────────────┘
                        │ HTTP/REST
                        │ Authorization: Bearer <token>
                        │
┌───────────────────────▼──────────────────────────────────────┐
│               EXPRESS BACKEND (Node.js)                      │
├───────────────────────────────────────────────────────────────┤
│                                                                │
│  Authentication Middleware                                    │
│  ├─ Verify token with Supabase                               │
│  ├─ Extract user_id                                          │
│  └─ Attach to request.user                                   │
│                                                                │
│  CRUD Endpoints                                               │
│  ├─ GET    /notes          → List all user notes              │
│  ├─ POST   /notes          → Create new note                 │
│  ├─ PUT    /notes/:id      → Update note                     │
│  ├─ DELETE /notes/:id      → Delete note                     │
│  └─ GET    /notes/:id      → Get single note                 │
│                                                                │
└───────────────────────┬──────────────────────────────────────┘
                        │ SQL Queries
                        │
┌───────────────────────▼──────────────────────────────────────┐
│            SUPABASE POSTGRESQL DATABASE                      │
├───────────────────────────────────────────────────────────────┤
│                                                                │
│  auth.users (Built-in)     │    notes (Our Table)            │
│  ├─ id (UUID)              │    ├─ id (BIGINT)               │
│  ├─ email                  │    ├─ user_id (UUID) ────┐      │
│  └─ password_hash          │    ├─ title (TEXT)       │      │
│                             │    ├─ description       │      │
│                             │    ├─ location (TEXT)   │      │
│                             │    ├─ price (NUMERIC)   │      │
│                             │    ├─ category (TEXT)   │      │
│                             │    ├─ created_at        │      │
│                             │    └─ (FK) ─────────────┘      │
│                                                                │
└───────────────────────────────────────────────────────────────┘
```

---

## Create Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    USER INTERACTION                         │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Problems.jsx                    Stores.jsx                 │
│  └─ Click "+ Add Problem"       └─ Click "+ List Service"  │
│       │                               │                     │
│       ▼                               ▼                     │
│  ┌──────────────────────┐     ┌──────────────────────┐     │
│  │  Modal Opens         │     │  Modal Opens         │     │
│  │  ProblemPad shows    │     │  StorePad shows      │     │
│  └──────────────────────┘     └──────────────────────┘     │
│       │                               │                     │
│       ▼                               ▼                     │
│  ┌──────────────────────────────────────────────────┐      │
│  │  User fills form:                                │      │
│  │  • Title / Business Name                         │      │
│  │  • Description                                   │      │
│  │  • Location                                      │      │
│  │  • Price (Stores only)                          │      │
│  │  • Category (Stores only)                       │      │
│  └────────────────┬─────────────────────────────────┘      │
│                   │                                         │
│                   ▼                                         │
│          User clicks Submit                                │
│                   │                                         │
│                   ▼                                         │
└─────────────────────────────────────────────────────────────┘
                    │
                    ▼
         ┌──────────────────────┐
         │  Validation Check    │
         ├──────────────────────┤
         │ Fields empty?        │
         │ ├─ Yes → Show error  │
         │ └─ No → Continue     │
         └──────────┬───────────┘
                    │
                    ▼
         ┌──────────────────────┐
         │ Call API             │
         │ createNote(data)     │
         └──────────┬───────────┘
                    │
                    ▼
  ┌─────────────────────────────────────┐
  │  API Layer (lib/api.js)             │
  ├─────────────────────────────────────┤
  │  1. Get token from localStorage     │
  │  2. Add Authorization header        │
  │  3. POST /notes with data           │
  │  4. Handle response                 │
  └──────────────┬──────────────────────┘
                 │
                 ▼ HTTP POST
  ┌──────────────────────────────────────────┐
  │  Backend (Express)                       │
  ├──────────────────────────────────────────┤
  │  1. Check Authorization header           │
  │  2. Verify token with Supabase           │
  │  3. Extract user_id                      │
  │  4. Validate input                       │
  │  5. Insert into notes table              │
  │  6. Return created note with ID          │
  └──────────────┬───────────────────────────┘
                 │
                 ▼ SQL INSERT
  ┌──────────────────────────────────────────┐
  │  Supabase Database                       │
  ├──────────────────────────────────────────┤
  │  INSERT INTO notes (                     │
  │    user_id, title, description,          │
  │    location, price, category, created_at │
  │  )                                       │
  └──────────────┬───────────────────────────┘
                 │
                 ▼ Response JSON
  ┌──────────────────────────────────────────┐
  │  Backend returns new note object         │
  │  {                                       │
  │    id: 123,                             │
  │    user_id: "xxx-xxx-xxx",              │
  │    title: "...",                        │
  │    ...                                  │
  │    created_at: "2024-02-04T10:00:00Z"   │
  │  }                                      │
  └──────────────┬───────────────────────────┘
                 │
                 ▼
  ┌──────────────────────────────────────────┐
  │  Frontend receives response              │
  │  in handleSubmit / onProblemAdded        │
  └──────────────┬───────────────────────────┘
                 │
                 ▼
  ┌──────────────────────────────────────────┐
  │  Update React state (Problems.jsx)       │
  │  setProblems([newNote, ...oldProblems])  │
  └──────────────┬───────────────────────────┘
                 │
                 ▼
  ┌──────────────────────────────────────────┐
  │  Component re-renders                    │
  │  New problem card appears in list        │
  │  Modal closes                            │
  │  Form clears                             │
  └──────────────────────────────────────────┘
```

---

## Read Flow

```
┌──────────────────────────────────────────────────┐
│         Page Mount (useEffect)                   │
│  Problems.jsx or Stores.jsx                      │
└──────────────────┬───────────────────────────────┘
                   │
                   ▼
┌──────────────────────────────────────────────────┐
│  Check: isAuthenticated()?                       │
│  ├─ No  → Redirect to /login                     │
│  └─ Yes → Continue                              │
└──────────────────┬───────────────────────────────┘
                   │
                   ▼
┌──────────────────────────────────────────────────┐
│  setLoading(true)                                │
│  Call: await getNotes()                          │
└──────────────────┬───────────────────────────────┘
                   │
                   ▼
┌──────────────────────────────────────────────────┐
│  API Layer (lib/api.js)                          │
│  ├─ Get token from localStorage                  │
│  ├─ Add Authorization header                     │
│  └─ GET /notes                                   │
└──────────────────┬───────────────────────────────┘
                   │
                   ▼ HTTP GET
┌──────────────────────────────────────────────────┐
│  Backend: GET /notes                             │
│  ├─ Verify token                                 │
│  ├─ Get user_id from token                       │
│  └─ SELECT * FROM notes WHERE user_id = ?       │
└──────────────────┬───────────────────────────────┘
                   │
                   ▼ SQL Query
┌──────────────────────────────────────────────────┐
│  Supabase Returns Array of Notes                 │
│  [                                               │
│    { id: 1, title: "...", ... },                │
│    { id: 2, title: "...", ... },                │
│    ...                                          │
│  ]                                              │
└──────────────────┬───────────────────────────────┘
                   │
                   ▼ JSON Response
┌──────────────────────────────────────────────────┐
│  Frontend receives array                         │
│  setProblems(data)  OR  setStores(data)          │
└──────────────────┬───────────────────────────────┘
                   │
                   ▼
┌──────────────────────────────────────────────────┐
│  setLoading(false)                               │
│  Component re-renders with data                  │
└──────────────────┬───────────────────────────────┘
                   │
                   ▼
┌──────────────────────────────────────────────────┐
│  Render grid of ProblemPanels/StorePanels        │
│  Each card displays:                             │
│  ├─ Title                                        │
│  ├─ Description                                  │
│  ├─ Location                                     │
│  ├─ Price (Stores)                              │
│  ├─ Category (Stores)                           │
│  ├─ Edit button                                  │
│  └─ Delete button                                │
└──────────────────────────────────────────────────┘
```

---

## Update Flow

```
┌──────────────────────────────────────────────────┐
│  User clicks Edit button on card                 │
│  ProblemPanel / StorePanel                       │
└──────────────────┬───────────────────────────────┘
                   │
                   ▼
┌──────────────────────────────────────────────────┐
│  setIsEditing(true)                              │
│  Inline form appears with current data           │
│  User can see all fields pre-filled              │
└──────────────────┬───────────────────────────────┘
                   │
                   ▼
┌──────────────────────────────────────────────────┐
│  User modifies fields                            │
│  setEditData({ ...editData, fieldName: value })  │
└──────────────────┬───────────────────────────────┘
                   │
                   ▼
┌──────────────────────────────────────────────────┐
│  User clicks Save                                │
│  handleSave() triggered                          │
└──────────────────┬───────────────────────────────┘
                   │
                   ▼
┌──────────────────────────────────────────────────┐
│  Validation Check                                │
│  ├─ All fields filled?                           │
│  ├─ Valid data format?                           │
│  └─ Continue if valid                            │
└──────────────────┬───────────────────────────────┘
                   │
                   ▼
┌──────────────────────────────────────────────────┐
│  API Call: updateNote(id, editData)              │
│  ├─ GET token                                    │
│  ├─ Add Authorization header                     │
│  └─ PUT /notes/:id with updated data             │
└──────────────────┬───────────────────────────────┘
                   │
                   ▼ HTTP PUT
┌──────────────────────────────────────────────────┐
│  Backend: PUT /notes/:id                         │
│  ├─ Verify token                                 │
│  ├─ Check note belongs to user                   │
│  ├─ Validate new data                            │
│  └─ UPDATE notes SET ... WHERE id = ?            │
└──────────────────┬───────────────────────────────┘
                   │
                   ▼ SQL UPDATE
┌──────────────────────────────────────────────────┐
│  Database updates row                            │
│  Returns updated note object                     │
└──────────────────┬───────────────────────────────┘
                   │
                   ▼ JSON Response
┌──────────────────────────────────────────────────┐
│  Frontend receives updated note                  │
│  onUpdate(updatedNote) callback                  │
└──────────────────┬───────────────────────────────┘
                   │
                   ▼
┌──────────────────────────────────────────────────┐
│  Update state:                                   │
│  setProblems(prev =>                             │
│    prev.map(p => p.id === id ? updatedNote : p) │
│  )                                               │
└──────────────────┬───────────────────────────────┘
                   │
                   ▼
┌──────────────────────────────────────────────────┐
│  setIsEditing(false)                             │
│  Form closes                                     │
│  UI displays updated data                        │
└──────────────────────────────────────────────────┘
```

---

## Delete Flow

```
┌──────────────────────────────────────────────────┐
│  User clicks Delete button on card               │
│  ProblemPanel / StorePanel                       │
└──────────────────┬───────────────────────────────┘
                   │
                   ▼
┌──────────────────────────────────────────────────┐
│  Confirmation Dialog appears                     │
│  "Are you sure you want to delete?"              │
│  ├─ Cancel → Dialog closes                       │
│  └─ Confirm → Continue                           │
└──────────────────┬───────────────────────────────┘
                   │
                   ▼
┌──────────────────────────────────────────────────┐
│  setIsLoading(true)                              │
│  API Call: deleteNote(id)                        │
│  ├─ GET token                                    │
│  ├─ Add Authorization header                     │
│  └─ DELETE /notes/:id                            │
└──────────────────┬───────────────────────────────┘
                   │
                   ▼ HTTP DELETE
┌──────────────────────────────────────────────────┐
│  Backend: DELETE /notes/:id                      │
│  ├─ Verify token                                 │
│  ├─ Check note belongs to user                   │
│  └─ DELETE FROM notes WHERE id = ?               │
└──────────────────┬───────────────────────────────┘
                   │
                   ▼ SQL DELETE
┌──────────────────────────────────────────────────┐
│  Database deletes row                            │
│  Returns success message                         │
└──────────────────┬───────────────────────────────┘
                   │
                   ▼ JSON Response
┌──────────────────────────────────────────────────┐
│  Frontend receives success                       │
│  onDelete(id) callback                           │
└──────────────────┬───────────────────────────────┘
                   │
                   ▼
┌──────────────────────────────────────────────────┐
│  Update state:                                   │
│  setProblems(prev =>                             │
│    prev.filter(p => p.id !== id)                 │
│  )                                               │
└──────────────────┬───────────────────────────────┘
                   │
                   ▼
┌──────────────────────────────────────────────────┐
│  setIsLoading(false)                             │
│  Card disappears from UI                         │
│  Component re-renders without deleted item       │
└──────────────────────────────────────────────────┘
```

---

## Error Handling Flow

```
                    ┌──────────────┐
                    │  API Call    │
                    └──────┬───────┘
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
        ▼                  ▼                  ▼
    ┌────────┐      ┌──────────┐      ┌──────────┐
    │Network │      │HTTP 401  │      │Other HTTP│
    │Error   │      │Unauthorized      │Errors    │
    └───┬────┘      └──────┬──────┘   └────┬─────┘
        │                  │               │
        ▼                  ▼               ▼
   ┌─────────────┐  ┌────────────┐  ┌──────────────┐
   │Remove token │  │Clear token │  │Extract error │
   │Retry button │  │Redirect to │  │message from  │
   │Show error   │  │/login      │  │response      │
   └─────────────┘  └────────────┘  └────┬─────────┘
                                         │
                                    ┌────▼────┐
                                    │User sees│
                                    │message  │
                                    └─────────┘
```

---

## State Management Flow

```
Problems.jsx              Stores.jsx
└─ [problems, setProblems]  └─ [stores, setStores]
   ├─ Fetched from API      ├─ Fetched from API
   ├─ Updated on create     ├─ Updated on create
   ├─ Updated on edit       ├─ Updated on edit
   └─ Updated on delete     └─ Updated on delete

Single source of truth: Backend Database

Frontend state mirrors backend (optimistic)
API calls confirm changes
Errors rollback state if needed
```

---

## Component Hierarchy

```
App
├── Router
│   ├── Login
│   ├── Signup
│   ├── Problems (Page)
│   │   ├── Navbar
│   │   ├── ProblemPanel (map each problem)
│   │   │   ├── Edit form (inline)
│   │   │   └── Delete button
│   │   └── ProblemPad (Modal)
│   │       └── Create form
│   ├── Stores (Page)
│   │   ├── Navbar
│   │   ├── StorePanel (map each store)
│   │   │   ├── Edit form (inline)
│   │   │   └── Delete button
│   │   └── StorePad (Modal)
│   │       └── Create form
│   └── Other pages...

API Layer (lib/api.js)
└── Used by all pages
```

---

## Authentication Flow

```
┌──────────────────┐
│  Signup/Login    │
│  (Supabase Auth) │
└────────┬─────────┘
         │
         ▼
┌──────────────────────────────┐
│  Backend responds with token │
│  (access_token from session) │
└────────┬─────────────────────┘
         │
         ▼
┌──────────────────────────────┐
│  localStorage.setItem('token')
└────────┬─────────────────────┘
         │
         ▼
┌──────────────────────────────┐
│  All API calls get token     │
│  Authorization: Bearer <tok> │
└────────┬─────────────────────┘
         │
         ▼
┌──────────────────────────────┐
│  Backend verifies token      │
│  Gets user_id from Supabase  │
└────────┬─────────────────────┘
         │
         ▼
┌──────────────────────────────┐
│  Queries filtered by user_id │
│  User sees only own data     │
└──────────────────────────────┘
```

---

These diagrams show the complete flow of data through your application!
