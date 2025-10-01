# 🏦 BTG Fondos - Angular + Clean Architecture

Aplicación web que simula la gestión de **fondos de inversión**, con autenticación, suscripción/cancelación de fondos y un historial de transacciones.  
El proyecto está desarrollado en **Angular + Angular Material**, siguiendo los principios de **Arquitectura Limpia (Clean Architecture)**.

---

## 📸 Demo

<img src="/img/1.png" width="300"/>

<img src="/img/2.png" width="300"/>

<img src="/img/3.png" width="300"/>

<img src="/img/4.png" width="300"/>

<img src="/img/5.png" width="300"/>

<img src="/img/6.png" width="300"/>

<img src="/img/7.png" width="300"/>

<img src="/img/8.png" width="300"/>

---

## 🚀 Características

- 🔑 **Autenticación** con diferentes roles:
  - Cliente
  - Consultor
  - Admin
- 💰 **Suscripción y cancelación** de fondos de inversión
- 📊 **Historial de transacciones** (personalizado según el rol)
- 🖥️ **Dashboard** con saldo actualizado en tiempo real usando **Signals**
- 🎨 **UI moderna con Angular Material** (toolbar, sidenav, tablas, botones, etc.)
- 🧩 Arquitectura limpia separada en capas:
  - **Domain** → Entidades, repositorios
  - **Application** → Casos de uso
  - **Infrastructure** → Implementaciones concretas
  - **Presentation** → Componentes Angular (UI)

---

## 🛠️ Tecnologías

- [Angular 17+](https://angular.io/)  
- [Angular Material](https://material.angular.io/)  
- [TypeScript](https://www.typescriptlang.org/)  
- [RxJS](https://rxjs.dev/)  
- Arquitectura basada en **Clean Architecture**  

---

## 📂 Estructura del Proyecto

```bash
src/
 ├── app/
 │   ├── domain/              # Entidades y repositorios
 │   ├── application/         # Casos de uso (UseCases)
 │   ├── infrastructure/      # Repositorios implementados (mock/localStorage)
 │   ├── presentation/        # Componentes Angular (UI + Angular Material)
 │   └── core/                # Servicios globales (AuthService, Guards, etc.)
```

---

## ⚙️ Instalación y Uso

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/btg-fondos.git
   cd btg-fondos
   ```

2. Instalar dependencias:
   ```bash
   npm install
   ```

3. Ejecutar en modo desarrollo:
   ```bash
   ng serve -o
   ```

4. Compilar para producción:
   ```bash
   ng build --configuration production
   ```

---

## 👤 Roles y Permisos

- **Cliente** → Ver sus propios fondos y transacciones  
- **Consultor** → Ver transacciones de todos los clientes (excepto otros consultores)  
- **Admin** → Gestionar usuarios, fondos y transacciones  

---

## 📝 Licencia
 
Siéntete libre de usarlo, modificarlo y mejorarlo.  

---

✨ Hecho con ❤️ usando **Angular + Clean Architecture**.
