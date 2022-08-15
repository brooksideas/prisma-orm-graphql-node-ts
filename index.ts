import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const app = express();

app.use(express.json());

const prisma = new PrismaClient();

app.post("/", async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const user = await prisma.user.create({
        data: {
            username: username,
            password: password
        }
    });

    res.json({ user });
});

app.post("/createMany", async (req: Request, res: Response) => {
    const { userList } = req.body;
    const users = await prisma.user.createMany({
        data: userList
    });

    res.json({ users });
});

// app.get("/", async (req: Request, res: Response) => {
//     const users = await prisma.user.findMany();
//     res.json({ users });
// });

app.get("/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    const users = await prisma.user.findUnique({
        where: {
            id: id
        }
    });
    res.json({ users });
});

app.get("/", async (req: Request, res: Response) => {
    const userCars = await prisma.user.findMany({
        include: {
            cars: true
        }
    });

    res.json({ userCars });
});


app.patch("/:id", async (req: Request, res: Response) => {

    const { id } = req.params;
    const { username } = req.body;

    const updateUser = await prisma.user.update({
        where: {
            id: id
        },
        data: {
            username: username
        }
    });

    res.json({ updateUser });

});
app.delete("/:id", async (req: Request, res: Response) => {
    const { id } = req.params;

    const deletedUser = await prisma.user.delete({
        where: {
            id: id
        }
    });

    res.json({ deletedUser });
});

// Cars
app.post("/car", async (req: Request, res: Response) => {

    const { model, year, userId } = req.body;
    const car = await prisma.car.create({
        data: {
            model: model,
            year: year,
            userId: userId
        }
    });

    res.json({ car });

});

app.get("/", (req: Request, res: Response) => { });


app.listen(3000, () => {
    console.log("Server running on Port 3000");
});