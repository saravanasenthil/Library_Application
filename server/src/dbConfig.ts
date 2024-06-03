import { DataSource } from "typeorm";
import { User} from "./models/userTable"
import { Book } from "./models/bookTable";
import{UserBook} from "./models/userBookTable"
import path from "path";
// import { config } from "dotenv";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "Sara@2002",
  database: "LibMan",
  synchronize: false,
  logging: true,
  entities: [path.join(process.cwd(), "src/models/*.ts")],
  migrations: ["src/migrations/**/*.ts"],
  subscribers: [],
});

export const checkConnection = async () => {
  try {
    await AppDataSource.initialize();
    console.log("db connected successfully");
  } catch (error) {
    
    console.log("cannot connect to db",error);
  }
};
