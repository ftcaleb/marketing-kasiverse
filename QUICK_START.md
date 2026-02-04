# Quick Start - Get Running in 5 Minutes

## Prerequisites
- Node.js installed
- Supabase account with credentials
- Backend `.env` file configured

---

## Step 1: Start Backend (2 min)

```bash
cd Backend
npm install          # Skip if already done
npm start           # Should see "Server running on port 3001"
```

Expected output:
```
Server running on port 3001
```

---

## Step 2: Configure Frontend (1 min)

Make sure `Kasiverse/.env` or `.env.local` has:
```
VITE_BACKEND_URL=http://localhost:3001
```

If file doesn't exist, create it.

---

## Step 3: Start Frontend (1 min)

```bash
cd Kasiverse
npm install          # Skip if already done
npm run dev         # Should show dev server URL
```

Open in browser (usually http://localhost:5173)

---

## Step 4: Test the App (1 min)

1. Click "Sign Up" button
2. Fill form and create account
3. Log in with your credentials
4. Go to "Community Problem Board" or "Kasi Marketplace"
5. Click "+ Add Problem" or "+ List Service"
6. Fill form and submit
7. Verify data appears

---

## Common Issues & Fixes

### Backend won't start
```
Error: Cannot find module
→ Run: npm install in Backend folder
```

### CORS Error in Console
```
Access to XMLHttpRequest blocked by CORS
→ Check VITE_BACKEND_URL is correct
→ Check backend is running
```

### Cannot create account
```
Error: Supabase connection failed
→ Check SUPABASE_URL and SUPABASE_ANON_KEY in Backend/.env
→ Verify Supabase project is active
```

### No data loads
```
Blank page with "No items yet"
→ Check if you're logged in
→ Check browser console for errors
→ Verify token in localStorage: 
   console.log(localStorage.getItem('token'))
```

### Edit/Delete buttons don't work
```
Not responding to clicks
→ Check browser console for errors
→ Verify backend is running
→ Check network tab in DevTools
```

---

## Quick Test Checklist

- [ ] Backend running on :3001
- [ ] Frontend running on :5173
- [ ] Can load app in browser
- [ ] Can create account
- [ ] Can log in
- [ ] Can add problem/store
- [ ] Can edit entry
- [ ] Can delete entry
- [ ] Data persists after refresh

---

## Browser DevTools Debugging

### Check Token
Open Console and run:
```javascript
console.log(localStorage.getItem('token'));
```
Should show a long string starting with `eyJ...`

### Test API Directly
```javascript
const token = localStorage.getItem('token');
fetch('http://localhost:3001/notes', {
  headers: { 'Authorization': `Bearer ${token}` }
})
.then(r => r.json())
.then(console.log);
```
Should show your notes as JSON array

### Check Errors
1. Open DevTools (F12)
2. Go to Console tab
3. Look for red error messages
4. Go to Network tab to see API calls

---

## File Structure Reference

```
marketing-kasiverse/
├── Backend/
│   ├── index.js         ← Main server (CRUD endpoints)
│   ├── supabase.js      ← DB connection
│   ├── .env             ← Credentials
│   └── package.json
│
└── Kasiverse/
    ├── src/
    │   ├── lib/
    │   │   └── api.js   ← API utility (NEW)
    │   ├── components/
    │   │   ├── ProblemPanel.jsx    ← Edit/Delete UI
    │   │   ├── ProblemPad.jsx      ← Create form
    │   │   ├── StorePanel.jsx      ← Edit/Delete UI
    │   │   └── StorePad.jsx        ← Create form
    │   ├── pages/
    │   │   ├── Problems.jsx        ← Problems page
    │   │   └── Stores.jsx          ← Stores page
    │   ├── .env         ← API URL
    │   └── main.jsx
    ├── package.json
    └── vite.config.js
```

---

## API Endpoints

Once backend is running, these endpoints are available:

```
POST   /register          (create account)
POST   /login             (login, get token)
GET    /notes             (fetch all user's notes)
POST   /notes             (create new note)
PUT    /notes/:id         (update note)
DELETE /notes/:id         (delete note)
```

Test them using:
```bash
# Create account
curl -X POST http://localhost:3001/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","password":"123456"}'

# Login
curl -X POST http://localhost:3001/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"123456"}'

# Get token from login response, then:

# Fetch notes
curl -X GET http://localhost:3001/notes \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"

# Create note
curl -X POST http://localhost:3001/notes \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "title":"My Problem",
    "description":"Full description",
    "location":"City",
    "price":null,
    "category":null
  }'
```

---

## Frontend Architecture

```
Problems Page (Problems.jsx)
├── Fetches data with getNotes()
├── Lists items with ProblemPanel
├── Each card has Edit/Delete
└── Modal for creating with ProblemPad

Stores Page (Stores.jsx)
├── Fetches data with getNotes()
├── Filters by category
├── Lists items with StorePanel
├── Each card has Edit/Delete
└── Modal for creating with StorePad

Both use shared API utility (lib/api.js)
```

---

## Production Checklist

Before going live:

- [ ] Update VITE_BACKEND_URL to production backend
- [ ] Update SUPABASE_URL to production instance
- [ ] Enable HTTPS for all connections
- [ ] Set up RLS policies in Supabase
- [ ] Configure CORS properly
- [ ] Set up monitoring/error logging
- [ ] Test on mobile devices
- [ ] Set up database backups
- [ ] Document all environment variables
- [ ] Set up CI/CD pipeline

---

## Next Steps

1. **Explore the Code**
   - Read `IMPLEMENTATION_SUMMARY.md`
   - Check `QUICK_REFERENCE.md` for patterns

2. **Customize**
   - Add more fields to notes table
   - Modify UI styling
   - Add additional features

3. **Deploy**
   - Backend: Deploy to Heroku, Railway, or similar
   - Frontend: Deploy to Vercel, Netlify, or similar
   - Database: Keep on Supabase (managed)

4. **Monitor**
   - Set up error tracking (Sentry)
   - Monitor API response times
   - Track user engagement

---

## Support Resources

- **API Reference**: See `QUICK_REFERENCE.md`
- **Full Guide**: See `CRUD_INTEGRATION_GUIDE.md`
- **Database**: See `DATABASE_SCHEMA.md`
- **Implementation Details**: See `IMPLEMENTATION_SUMMARY.md`

---

## 🚀 You're Ready!

Everything is configured and ready to run. Start both servers and begin testing!

**Questions? Check the documentation files or the browser console for error messages.**
