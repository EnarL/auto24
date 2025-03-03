FROM openjdk:21-jdk-slim

WORKDIR /app

# Copy the JAR file from the build/libs directory relative to the build context
COPY backend/build/libs/auto24-*.jar /app/auto24.jar

# Copy the .env file from the backend directory
COPY backend/.env /app/.env

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "/app/auto24.jar"]
