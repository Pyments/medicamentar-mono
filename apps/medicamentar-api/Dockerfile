FROM jelastic/maven:3.9.5-openjdk-21 AS build
WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests

FROM openjdk:21-jdk-slim
WORKDIR /app
COPY --from=build /app/target/*.jar /app/medicamentar-api.jar

EXPOSE 8080
CMD ["java", "-jar", "/app/medicamentar-api.jar"]
