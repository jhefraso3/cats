# Buenas Prácticas para el Frontend en Angular

## Contenido

1. [Ejecutar el Frontend y Acceder a la Aplicación](#ejecutar-el-frontend-y-acceder-a-la-aplicación)
2. [Estructura de Carpetas](#estructura-de-carpetas)
3. [Reglas de Nombrado](#reglas-de-nombrado)
4. [Uso de Componentes y Servicios](#uso-de-componentes-y-servicios)

---

## Ejecutar el Frontend y Acceder a la Aplicación

Para ejecutar el frontend, sigue estos pasos:

1. Instala las dependencias necesarias con:
   ```bash
   npm install
   ```
2. Una vez instaladas las dependencias, inicia el servidor de desarrollo con:

```bash
   ng serve
```

3. Para acceder a la aplicación en tu entorno local, abre tu navegador y visita:

```bash
   http://localhost:4200
```

---

## Estructura de Carpetas

Seguimos una organización modular basada en dos secciones principales:

- **Core:** Contiene funcionalidades globales y reutilizables de la aplicación. Incluye:
  - `navigation/` - Contiene la `sidenav` (barra lateral de navegación) y los botones de navegación que redirigen a las vistas ubicadas en `Pages`.
  - `navigation/navigation-routing.ts/` - Define las rutas para los módulos y componentes, permitiendo su visualización dentro del layout principal de la aplicación.
  - `styles/` - Contiene las clases y estilos necesarios para implementar un diseño responsive en la aplicación.
- **Pages:** Contiene los módulos y componentes que representan las vistas principales de la aplicación. Cada módulo o componente se organiza de la siguiente manera:
  - `{nombre de Modulo/Componente}/` - Cada carpeta representa un módulo o componente específico que lleva el contenido y la lógica de una vista particular de la aplicación.

```
src/
├── app/
│   ├── core/
│   │   ├── navigation/            # Sidenav y botones de navegación
│   │   │   ├── navigation-routing/    # Rutas para el layout principal
│   │   └── styles/               # Estilos responsive
│   ├── pages/
│   │   ├── home/                  # Ejemplo de Módulo/Componente para la página de inicio
│   │   ├── users/                 # Ejemplo de Módulo/Componente para la gestión de usuarios
│   │   └── dashboard/             # Ejemplo de Módulo/Componente para el panel de control
│   ├── app.module.ts              # Módulo principal de la aplicación
│   └── app-routing.module.ts      # Rutas principales de la aplicación
└── ...
```

---

## Reglas de Nombrado

Para mantener un código limpio y uniforme en el frontend, se aplican las siguientes reglas de nombrado:

- **Archivos:** Se nombran en minúsculas y separados por guiones medios (`-`). Ejemplo:
  - `user-info.module.ts` (módulo de información de usuario).
  - `auth-service.ts` (servicio de autenticación).
  - `navigation.component.ts` (componente de navegación).
- **Rutas:** Minúsculas y separadas por guiones (`-`). Ejemplo:
  - `/user-info` (ruta para la información de usuario).
  - `/dashboard` (ruta para el panel de control).
  - `/auth/login` (ruta para el inicio de sesión).
- **Variables y Métodos:** Usan `camelCase`. Ejemplo:
  - `userData` (variable que almacena datos de usuario).
  - `getUserInfo()` (método para obtener información del usuario).
- **Clases y Componentes:** Usan PascalCase. Ejemplos:
  - `UserInfoComponent` (componente de información de usuario).
  - `AuthService` (servicio de autenticación).
- **Constantes** Se escriben en MAYÚSCULAS con guiones bajos (`_`). Ejemplos:
  - `MAX_USERS_ALLOWED` (límite máximo de usuarios permitidos).
  - `DEFAULT_TIMEOUT` (tiempo de espera predeterminado).

### Ejemplos de Nombrado

| Tipo             | Ejemplo Correcto      | Ejemplo Incorrecto   |
| ---------------- | --------------------- | -------------------- |
| Archivo          | `user-info.module.ts` | `userInfo.module.ts` |
| Ruta             | `/user-info`          | `/userInfo`          |
| Variable         | `userData`            | `user_data`          |
| Método           | `getUserInfo()`       | `get_user_info()`    |
| Clase/Componente | `UserInfoComponent`   | `userInfoComponent`  |
| Constante        | `MAX_USERS_ALLOWED`   | `maxUsersAllowed`    |

---

## Uso de Componentes y Servicios

En el frontend, la lógica de la aplicación se divide entre componentes y servicios, siguiendo las mejores prácticas de Angular. A continuación, se describe cómo se estructuran y utilizan:

- **Modulos y Componentes:**
  Los componentes se encuentran en la carpeta `pages/` y están organizados por módulos. Cada componente esta en la carpeta `components/` de un modulo y tiene tres archivos principales:

  - `HTML`: Define la estructura y el contenido de la vista.
  - `CSS`: Contiene los estilos específicos del componente.
  - `TS (TypeScript)`: Maneja la lógica de la vista, la interacción del usuario y la comunicación con los servicios.

  ### Responsabilidades de los Componentes:

  - **Presentación:** Mostrar datos en la vista y manejar la interacción del usuario (eventos como clics, formularios, etc.).
  - **Comunicación con Servicios:** Consumir servicios para obtener o enviar datos al backend.
  - **No contener lógica de negocio:** La lógica compleja debe delegarse a los servicios.

  ### Ejemplo de un Componente:

  ```typescript
    import { Component, OnInit, inject } from '@angular/core';
    import { Subscription } from 'rxjs';
    import { UserService } from '../../services/user.service';
    import { User } from '../../interfaces/user.interface';

    @Component({
    selector: 'app-user-info',
    templateUrl: './user-info.component.html',
    styleUrls: ['./user-info.component.css']
    })
    export class UserInfoComponent implements OnInit {
        user: User;
        subscription$: Subscription[] = [];

        userService = inject(UserService)

        constructor() {}

        ngOnInit(): void {
            this.getUserInfo();
        }

        getUserInfo(){
            this.subscription = [
                ...this.subscription,
                this.userService.getUserInfo().subscribe((data: User) => {
                    this.user = data;
                });
            ]
        }
    }
  ```

- **Servicios:**
  Los servicios se encargan de la comunicación con el backend y contienen la lógica de negocio. Se ubican en la carpeta services/.

  - **Peticiones HTTP:** Realizar llamadas al backend usando `HttpClient`.
  - **Reutilización:** Centralizar la lógica para que pueda ser usada por múltiples componentes.

  ### Ejemplo de un Servicio:

  ```typescript
  import { HttpClient } from '@angular/common/http';
  import { Injectable } from '@angular/core';
  import { CrudService } from 'src/app/core/services/http/crud.service';
  import { User } from '../interfaces/user-info.interface';
  import { Observable } from 'rxjs';

  @Injectable({
    providedIn: 'root',
  })
  export class UserService extends CrudService {
    endpoint = '';

    constructor(http: HttpClient) {
      super(http);
    }

    getUserInfo(id: string): Observable<User> {
      this.endpoint = 'users';
      return this.get<User>(id);
    }
  }
  ```

- **Interfaces:**
  Las interfaces se utilizan para definir estructuras de datos y se ubican en la carpeta `interfaces/`. Estas son útiles para:

  - `Tipar datos recibidos del backend`: Asegurar que los datos tengan la estructura esperada.
  - `Estructurar datos en los componentes`: Definir tipos para variables y objetos usados en el HTML y el TypeScript.

  ```typescript
  export interface User {
    id: number;
    name: string;
    email: string;
    role: string;
  }
  ```

---
