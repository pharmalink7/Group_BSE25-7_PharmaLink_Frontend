# **Final Report – CI/CD Implementation for PharmaLink Web Application**

**Group:** BSE25-7  
**Members:**  
- **Cyiza Ndoli Jean De Dieu – 22/X/5245/PS**  
- **Ndjekornom Victoire – 22/X/5270/PS**  
- **Ssenyonjo Alvin – 22/U/6952**  
- **Mulindwa Yusuf – 22/U/20859/PS**  

**Course:** BSE4101 Emerging Trends in Software Engineering  
**Date:** October 10, 2025  

---

## **1. Introduction**

This report summarizes the implementation of the **Continuous Integration and Continuous Deployment (CI/CD) pipeline** for the PharmaLink project. The system consists of a **React frontend** and a **Django backend**, with **staging** and **production environments**.  

The objective was to **automate testing, building, and deployment** while ensuring **reliability, rollback capability, and monitoring**.  

---

## **2. CI/CD Pipeline Overview**

### **Frontend**

- **Platform:** React  
- **Staging Hosting:** Vercel  
- **Production Hosting:** Vercel  
- **Pipeline:** GitHub Actions triggers on **main branch push** and **pull requests**  

**Steps:**  
1. Checkout code  
2. Setup Node.js environment  
3. Install dependencies (`npm ci`)  
4. Run linter (`npm run lint`)  
5. Run unit tests (`npm test -- --watchAll=false`)  
6. Build project (`npm run build`)  
7. Deploy to **staging → deploy to production** if staging passes  

---

### **Backend**

- **Platform:** Django + PostgreSQL  
- **Staging Hosting:** Render  
- **Production Hosting:** Render  
- **Pipeline:** GitHub Actions triggers on **main** and **develop branch push/pull requests**  

**Steps:**  
1. Checkout code  
2. Setup Python environment  
3. Install dependencies (`pip install -r requirements.txt`)  
4. Setup and migrate database  
5. Run system checks and Django unit tests  
6. Deploy to **staging → deploy to production** if staging passes  

---

## **3. Rollback Strategy**

- Deployment occurs **only after tests pass in the staging environment**.  
- If **production deployment fails**, the previous **stable version remains active** on **Vercel** (frontend) and **Render** (backend).  
- **Rollback** is achieved by **redeploying the last successful commit** from GitHub.  

---

## **4. Monitoring Setup**

- **Frontend:** Vercel Analytics  
- **Backend:** Render deployment logs and HTTP response checks via **Postman/Insomnia**  

**Metrics monitored include:**  
- Traffic  
- Response time  
- Errors  
- Uptime  

---

## **5. Key Challenges**

- Initial CI configuration errors due to **YAML syntax mistakes**  
- Ensuring **frontend and backend environments are synchronized**  
- Managing **environment variables securely** across staging and production  
- Limited prior experience with CI/CD, causing **delayed pipeline debugging**  
- Handling **test database setup** in CI for Django  
- Delays in deployment verification due to **lack of automated monitoring initially**  

---

## **6. Tools and Technologies**

- **Version Control & CI/CD:** Git, GitHub Actions  
- **Frontend:** React, npm, Jest, ESLint, Vercel  
- **Backend:** Django, PostgreSQL, flake8, Render  
- **Testing:** Django unit tests, React unit tests  
- **Monitoring:** Vercel Analytics, Render Logs  
- **Documentation:** Markdown, GitHub Wiki, Docs folder  
- **Task Management:** ClickUp  

---

## **7. Conclusion**

The team successfully implemented a **robust CI/CD pipeline** for PharmaLink, ensuring that both **frontend** and **backend** are **tested and deployed automatically**.  

Staging environments were fully operational **before production deployment**. Despite minor challenges, the team effectively used **GitHub Actions, Vercel, and Render** for **reliable deployment**, with monitoring ensuring **system health**.  

---

### **Staging URLs**

- **Frontend:** [https://group-bse-25-7-pharma-link-frontend-mu.vercel.app/](https://group-bse-25-7-pharma-link-frontend-mu.vercel.app/)  
- **Backend:** [https://group-bse25-7-pharmalink-backend.onrender.com/](https://group-bse25-7-pharmalink-backend.onrender.com/)  

### **Production URLs**

- **Frontend:** [https://group-bse-25-7-pharma-link-frontend.vercel.app/](https://group-bse-25-7-pharma-link-frontend.vercel.app/)  
- **Backend:** [https://pharmalink-x7j6.onrender.com/](https://pharmalink-x7j6.onrender.com/)  
