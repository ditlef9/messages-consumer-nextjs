
# 🗺️ Messages Consumer with Next.js 🌍

The **Messages Consumer with Next.js** is a Next.js application that consumes messages
from the backend **messages-api-postgresql-go**. 



---

## ✨ Features

-- 🔐 Secure Authentication: Uses secure service account credentials to communicate with backend.
- 📨 Message Consumption: Fetches and displays messages from the backend in real-time.
- ⚡ Fast Rendering: Leverages Next.js for fast server-side rendering and static generation.


---

## Getting Started

Add the user name and password for the service account in a .env file (for example .env.dev):
```
# Backend credentials
NEXT_PUBLIC_BACKEND_EMAIL="service.account@email.com"
NEXT_PUBLIC_BACKEND_PASSWORD="GolangMsg1#"
```

Then run the application:

```bash
npm install
npm run dev
```



---


## 📜 License

This project is licensed under the
[Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0).

```
Copyright 2024 github.com/ditlef9

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```