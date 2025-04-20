FROM eclipse-temurin:21
WORKDIR /app
COPY /target/ecommerce-backend.jar app.jar
RUN groupadd -r appgroup && useradd -r -g appgroup appuser
RUN chown -R appuser:appgroup /app
USER appuser
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]