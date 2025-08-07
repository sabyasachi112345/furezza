# Frontend FSM UI

A React + TypeScript + Vite-based frontend application for managing field service jobs with features like Gantt charts, technician tracking, and location-based views.

---

## 🔧 Project Setup

### 1. Clone the Repository

```bash
git clone https://bitbucket.org/inovaantagefuerza/frontend.git
cd frontend

2. Install Dependencies
npm install

3. Start Development Server
npm run dev

App runs at http://localhost:5173

Working with This Repo
We use a pull-request-based workflow to ensure code quality and safe collaboration.

🔀 Branching Strategy
main: Always production-ready and protected.

Feature branches should follow this format:

bash
Copy
Edit
feature/<short-description>
fix/<short-description>
chore/<short-description>
Example:

bash
Copy
Edit
git checkout -b feature/job-filter-ui
✅ Making a Change
Create your feature branch.

Make your changes.

Commit with a meaningful message.

Push to Bitbucket:

bash
Copy
Edit
git push -u origin feature/job-filter-ui
Open a Pull Request (PR) into main.

Assign reviewers (default: @inovaantagefuerza).

PRs must be approved before merging.

👥 Collaborator Guidelines
Never commit directly to main.

Always go through a Pull Request.

Keep PRs small and focused.

Add a summary to your PR description: what/why/how.

Follow project coding standards (Prettier + ESLint included).

Run npm run lint and npm run format before submitting PRs.


For creating docker image of the react file in the future : 

# Stage 1: Build
FROM node:20-alpine as build
WORKDIR /app
COPY . .
RUN npm install && npm run build

# Stage 2: Serve with NGINX
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80