import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(1, { message: 'Required' }),
  age: z.number().min(10),
});

const onSubmit = (data: unknown) => {
  console.log(data);
};

export const Test = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  return (
    <form onSubmit={void handleSubmit(onSubmit)}>
      <input {...register('name')} />
      {errors.name?.message && <p>{errors.name.message}</p>}
      <input type="number" {...register('age', { valueAsNumber: true })} />
      {errors.age?.message && <p>{errors.age.message}</p>}
      <input type="submit" />
    </form>
  );
};
