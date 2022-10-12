This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First install all npm package
npm install

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## For development build

First, run:
npm run build

After build complete:
nom run start

<br>

# Docker

### 1. To build docker image

### ```docker build -t skillslashapp .```

</br>

### 2. To run docker image

```docker run -p 3000:3000 skillslashapp```


</br>

### 3. To run docker in contineous mode

### ```docker run -d -t -p 3000:3000 skillslashapp```

</br>

### 4. To check running docker container

### ```docker ps```

</br>

###5. To stop running docker image/container

```docker stop <container id>```

### Ex: ```docker stop 5tsmdor4vrrg4```

</br>

### 6. To check all docker images

### ```docker images```

</br>

### 7. To remove docker images

### ```docker rmi -f <docker image name>```
### Ex: ```docker rmi -f 4r3rfvdb4gv3```