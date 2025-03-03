FROM openjdk:21-jdk-slim

WORKDIR /app


COPY build/libs/auto24-*.jar /app/auto24.jar


COPY .env /app/.env

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "/app/auto24.jar"]
