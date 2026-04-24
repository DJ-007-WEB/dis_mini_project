# Stage 1: Build Frontend
FROM node:20-alpine as frontend-builder
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

# Stage 2: Build Backend
FROM maven:3.9.4-eclipse-temurin-21 as backend-builder
WORKDIR /app
COPY pom.xml ./
COPY src ./src
# Copy build frontend files to webapp directory to include them in the WAR
COPY --from=frontend-builder /app/frontend/dist ./src/main/webapp/
RUN mvn clean package -DskipTests

# Stage 3: Run
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
# We use Jetty's standalone or just run it via Jetty runner?
# For simplicity, for a WAR, we can use a Jetty container
# But since the project uses jetty-maven-plugin, let's use a standard Tomcat or Jetty image
FROM jetty:11-jre21-alpine
COPY --from=backend-builder /app/target/LMS_Project.war /var/lib/jetty/webapps/ROOT.war
EXPOSE 8080
