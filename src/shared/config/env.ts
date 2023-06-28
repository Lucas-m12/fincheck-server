import { plainToInstance } from 'class-transformer';
import { IsNotEmpty, IsString, validateSync } from 'class-validator';

class Env {
  @IsString()
  @IsNotEmpty()
  jwtSecret: string;

  @IsString()
  @IsNotEmpty()
  dbURL: string;
}

export const env = (key: keyof Env) => {
  const result = plainToInstance(Env, {
    jwtSecret: process.env.JWT_SECRET,
    dbURL: process.env.DATABASE_URL,
  });
  const errors = validateSync(result);
  if (errors.length) throw new Error(JSON.stringify(errors, null, 2));
  return result[key];
};
