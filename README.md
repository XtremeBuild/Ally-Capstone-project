# Agentic Collaborator Setup Guide

## Overview

**Agentic Collaborator** is a AI powered tool designed for integrating with Outlook, allowing users to track email threads and generate sentiment using AI. This project uses various technologies like Docker, NGROK, Node.js, and Firebase to provide a seamless experience. This guide will walk you through the steps to set up the project locally and get started with development and testing.

## Installations

Before starting the project, ensure you have the following tools installed:

1. **[Visual Studio](https://visualstudio.microsoft.com/downloads/)**  
   Download and install Visual Studio for code editing and project setup.

2. **[Docker Desktop](https://www.docker.com/products/docker-desktop/)**  
   Download and install Docker. After installation, open Docker and sign up or log in to your account.

3. **[Node.js](https://nodejs.org/en/learn/getting-started/how-to-install-nodejs)**  
   Download and install Node.js.

4. **[NGROK](https://download.ngrok.com/mac-os)**  
   Download NGROK and sign up or log in. Follow the command line instructions to configure it.

5. **[Outlook Mail Desktop App](https://outlook.live.com/)**  
   Download and install the Outlook Mail Desktop App.

---

## Widget Installation

1. Go to https://aka.ms/olksideload.

2. Click on the left sidebar and go to "My add-ins".
3. Scroll to bottom of the page and click add custom add in.
4. Click add from file and navigate to project.
5. Add XML file from Website/outlookWidget/agentic to outlook custom add ins.

---

## API Keys and Service Accounts

### **API Key Configuration**

Create a `.env` file in the `Website/backend` directory and add your OpenAI API key:

```plaintext
OPENAI_API_KEY=your-api-key-here
```

---

## How to Run Agentic Collaborator

Follow these steps to set up and run **Agentic Collaborator**:

1. **Unzip the Project**  
   Unzip the project deliverable and open the `Website` folder in Visual Studio.

2. **Start NGROK**  
   Open a terminal and run the following command to start NGROK:

   ```bash
   ngrok http 8000
   ```

   Copy the NGROK forwarding link and paste it into:

   - `Website/backend/config.py`
   - `Website/frontend/src/const.tsx`
   - `Website/outlookWidget/test/src/taskpane/const.js`

3. **Install Frontend Dependencies**  
   Open a terminal inside the `Website/outlookWidget/agentic` directory. Run the following commands to install necessary packages:

   ```bash
   npm install
   ```

4. **Start Development Server**  
   Run the following command to start the development server:

   ```bash
   npm run dev-server
   ```

5. **Login to Outlook**  
   Open the Outlook Mail app and log in using the following credentials:

   - Username: `achen1076@teamally.onmicrosoft.com`
   - Password: `#TeamCapstone1`

6. **Show Taskpane**  
   In Outlook, click on the three dots on the navigation bar. Select `Agentic Collaborator Add-in` > `Show taskpane`.

7. **Start Docker**  
   Open Docker and log in/sign up. In the terminal, run the following command to build and start the containers:

   ```bash
   docker-compose up --build
   ```

   or, if using newer versions of Docker:

   ```bash
   docker compose up --build
   ```

8. **Agentic Collaborator is Ready!**  
   Once the containers are running, the Agentic Collaborator is ready to use.

---

## Notes

- **NGROK Forwarding Link**  
  NGROK generates a new link each time it is restarted. Always remember to copy and paste the new NGROK link into the required configuration files before running Docker.
- **Final Working Branch**  
  The final working branch is `carrots-and-peas`.

---

## Docker Commands

To run the containers:

```bash
docker-compose up --build
```

To stop the containers:

```bash
docker-compose down
```

To clear Docker cache in case of storage errors:

```bash
docker system prune --volumes
```

---

## Getting Started with GitLab

If you're new to GitLab, here’s a quick guide on how to get started:

1. **Add Files**  
   Create or upload files to your GitLab repository.
2. **Add Files Using the Command Line**  
   If you have an existing Git repository, you can add it to GitLab using the following commands:

   ```bash
   cd existing_repo
   git remote add origin https://gitlab.msu.edu/cse-498-team-ally/website.git
   git branch -M main
   git push -uf origin main
   ```

3. **Set Up Project Integrations**  
   [Set up project integrations](https://gitlab.msu.edu/cse-498-team-ally/website/-/settings/integrations) to connect with other services.

4. **Collaborate with Your Team**  
   Invite team members and collaborators to your project and create merge requests to integrate changes.

---

## Roadmap

We’re working on continuous improvements and new features. This is still in development.

---

## Authors and Acknowledgments

This project was developed by the **CSE-498 Team Ally** at Michigan State University. Special thanks to everyone who contributed, including:

- **Team Members**:

1. Abdullah Baqai
2. Alison Schlacht
3. Andrew Chen
4. Areeb Islam
5. Pranta Nir Barua
6. Stefan Lemke

- **Mentor**: Griffin Klevering.

- **Sponsers**: Divyesh Jambusaria, Dan Lemont, Jesse Podell, and John Stoutenger.

We also want to acknowledge the following resources:

- **OpenAI** for providing the AI model integration.
- **Docker** for simplifying containerization and deployment.
- **NGROK** for enabling secure tunneling during development.

---

## Project Status

Development is ongoing. Contributions and feedback are welcome!

---

## Contact

For any questions or suggestions, feel free to reach out to us at:  
**Email**: kleveri2@msu.edu
**GitLab**: [https://gitlab.msu.edu/cse-498-team-ally](https://gitlab.msu.edu/cse-498-team-ally)

### Key Sections Included:

- **How to Run Agentic Collaborator**: Step-by-step instructions to get the project up and running.
- **Notes**: Important reminders and information related to the project setup.
- **Docker Commands**: Useful commands for running and managing Docker containers.
- **Getting Started with GitLab**: Instructions for using GitLab, including setting up a project and collaborating.
- **Roadmap**: Planned features and updates for the future of the project.
- **Authors and Acknowledgments**: Credits and thanks to the contributors and resources.
- **Project Status**: Current status of the project.
