import fs from "fs"
import { root_dir } from "../config/config"

export function deleteFile (filename: any) {
    fs.unlinkSync(`${root_dir}/public/cake/${filename}`)
}