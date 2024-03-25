import * as yup from "yup";
/**
 * Customize Error
 */
const order = yup.object({
  no: yup.number().required(),
  sku: yup.string().test({
    name: "is-sku",
    // Skip pengujian jika tidak ada sku
    skipAbsent: true,
    test(value, ctx) {
      if (!value?.startsWith("s-")) {
        return ctx.createError({ message: "SKU missing correct prefix" });
      }
      if (!value.endsWith("-42a")) {
        return ctx.createError({ message: "SKU missing correct suffix" });
      }
      if (value.length < 10) {
        return ctx.createError({ message: "SKU is not the right length" });
      }
      return true;
    },
  }),
});

// console.log(await order.validate({ no: 1234, sku: "s-1a45-42aa" }));

// Penggunakaan InferType untuk langsung mendapatkan type dari schema (TypeScript integration)
const personSchema = yup.object({
  firstName: yup.string().defined(),
  nickName: yup.string().default("").nullable(),
  sex: yup
    .mixed()
    .oneOf(["male", "female", "other"] as const)
    .defined(),
  email: yup.string().nullable().email(),
  birthDate: yup.date().nullable().min(new Date(1900, 0, 1)),
});

type PersonType = yup.InferType<typeof personSchema>;

// Schema defaults atau pakai defaultValue agar tidak terbaca undefined
const validateWithDefaultValue = async (value: unknown) => {
  const schema = yup.string().default("Halo ini default value");
  const validatedValue = await schema.validate(value);
  return validatedValue;
};

const validateWithoutDefaultValue = async (value: unknown) => {
  const schema = yup.string();
  const validatedValue = schema.validate(value);
  return validatedValue;
};

console.log(await validateWithDefaultValue(undefined));
console.log(await validateWithoutDefaultValue(undefined));

/*
import { object, number, string, ObjectSchema } from "yup";

interface Person {
  name: string;
  age?: number;
  sex: "male" | "female" | "other" | null;
}

// will raise a compile-time type error if the schema does not produce a valid Person
const schema: ObjectSchema<Person> = object({
  name: string().defined(),
  age: number().optional(),
  sex: string<"male" | "female" | "other">().nullable().defined(),
  halo: string(),
});

// ❌ errors:
// "Type 'number | undefined' is not assignable to type 'string'."
const badSchema: ObjectSchema<Person> = object({
  name: number(),
});
*/
