import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { insertNews } from "@/integrations/firebase/news";
import type { NewsCategory, NewsArticle } from "@/types/news";
import { toast } from "@/components/ui/use-toast";

const formSchema = z.object({
  title: z.string().min(1, "Título é obrigatório"),
  summary: z.string().min(1, "Resumo é obrigatório"),
  content: z.string().min(1, "Conteúdo é obrigatório"),
  image: z.string().url("Imagem deve ser uma URL"),
  category: z.enum(["marilia", "regiao", "brasil", "mundo", "entretenimento", "esporte"]),
});

const categories: { value: NewsCategory; label: string }[] = [
  { value: "marilia", label: "Marília" },
  { value: "regiao", label: "Região" },
  { value: "brasil", label: "Brasil" },
  { value: "mundo", label: "Mundo" },
  { value: "entretenimento", label: "Entretenimento" },
  { value: "esporte", label: "Esporte" },
];

const AdminNews = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      summary: "",
      content: "",
      image: "",
      category: "marilia",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const article: NewsArticle = {
      id: crypto.randomUUID(),
      title: values.title,
      summary: values.summary,
      content: values.content,
      image: values.image,
      category: values.category,
      createdAt: new Date().toISOString(),
      likes: 0,
    };

    try {
      await insertNews(article);
      toast({ title: "Notícia adicionada" });
      form.reset();
    } catch (err) {
      toast({ title: "Erro ao adicionar notícia" });
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold">Adicionar Notícia</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Título</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="summary"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Resumo</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Conteúdo</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Imagem (URL)</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Categoria</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories.map((c) => (
                      <SelectItem key={c.value} value={c.value}>
                        {c.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Salvar</Button>
        </form>
      </Form>
    </div>
  );
};

export default AdminNews;

