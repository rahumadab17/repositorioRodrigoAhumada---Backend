import mongoose from 'mongoose'
import { MONGODB_CNX_STR } from ''

await mongoose.connect(MONGODB_CNX_STR)