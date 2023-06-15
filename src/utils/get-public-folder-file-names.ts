import { promises as fs } from 'fs'
import path from 'path'

export async function getPublicFolderFileNames(): Promise<string[]> {
  const folderPath = path.join(__dirname, '/../public')

  try {
    const fileNames = await fs.readdir(folderPath)
    return fileNames
  } catch (err) {
    console.error('Erro ao ler a pasta:', err)
    return []
  }
}
