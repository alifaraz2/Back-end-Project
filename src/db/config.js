import { Sequelize } from "sequelize"
const sequelize = new Sequelize("MR15", "postgres", "database1", {
  host: "localhost",
  port:5432,
  logging:false,
  dialect: "postgres",
})
const connectDB = async () => {
  try {
    await sequelize.authenticate()
    console.log("Connection has been established successfully.")
  } catch (error) {
    console.error("Unable to connect to the database:", error)
  }
}
export {connectDB};
export default sequelize;
