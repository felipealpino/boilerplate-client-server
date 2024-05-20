import { PayloadError } from '@/errors/PayloadError';
import { z } from 'zod';

type parseFactory<T extends z.ZodTypeAny> = (data: unknown) => z.infer<T>;

export const parseFactory = <T extends z.ZodTypeAny>(schema: T): parseFactory<T> => {
  return (data) => {
    const parsed = schema.safeParse(data);
    if (parsed.success) return parsed.data;

    const message = 'Error ao validar Payload';
    let errors: string[] = [];
    if ('error' in parsed) {
      errors = formatError(parsed.error);
    } else {
      errors = ['Nenhuma mensagem retornada pelo Zod safeParse.'];
    }

    throw new PayloadError({ message, errors });
  };
};

const formatError = (error: z.ZodError) => {
  return error.issues.flatMap((issue) => {
    const path = issue.path.join('.');
    const message = issue.message;
    return `PATH: ${path.length > 0 ? path : '-'} | MESSAGE: ${message}`;
  });
};
