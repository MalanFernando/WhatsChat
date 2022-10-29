# BACK END CHAT

-Express
-PostgreSQL
-Sequelize ORM
-Autenticación con Tokens
-Bcrypt para hashear contraseñas 
-Use de Json Web Token JWT

- Rutas de login y creacion de usuario (register)
- Restablecimiento de contraseña y confirmación en cuentas de usuarios
- Herramienta para publicar imagenes de perfil
- CRUD de usuario con autenticación y manejo de permisos

Orden
1. app.js
2. .env
3. config.js
4. database.js
5. modelos
6. controladores
7. servicios

Rutas 
* Ruta raíz
/api/v1/

# Users
 /users
 /users/me
 /users/:id

# auth
 /auth/register
 /auth/user-confirm/:token
 /auth/login
 /auth/forgot-password
 /auth/forgot-password/:token

# Convesations
 /conversations
 /conversations/:conversation_id
 /conversations/:conversation_id/messages/:message_id

# Participants
 /conversations/:conversation_id/participants
 /conversations/:conversation_id/participants/:participant_id

