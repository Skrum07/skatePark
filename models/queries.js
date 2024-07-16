import { pool } from "../config/db.js";

const register = async ({name, email, experience, specialty, password, image}) => {
    try {
        const sql = {
            text: "INSERT INTO users (name, mail, experience, specialty, password, image) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
            values: [name, email, experience, specialty, password, image]
        }
        const response = await pool.query(sql);
        if (response.rowCount > 0) {
            return response.rows[0];
        } else {
            return null;
        }
} catch (error) {
    console.log("Error code: ", error.code, "Error message: ", error.message);
    }
};

const findOneByEmail = async(email) => {
    try {
        const sql = {
            text: "SELECT * FROM users WHERE mail = $1",
            values: [email],
        };
        const response = await pool.query(sql);
        if (response.rowCount > 0) {
            return response.rows[0];
            } else {
                return null;
                }
                } catch (error) {
                    console.log("Error code: ", error.code, "Error message: ", error.message);
                    }
};

export const models = {
    register,
    
}