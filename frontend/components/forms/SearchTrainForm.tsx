'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRightLeft, CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Station } from "@/packages/types/api/models/Station";
import { StationSelect } from "../shared/StationSelect";
import { useRouter } from "next/navigation";

const searchFormSchema = z.object({
  from: z.string({
    required_error: "Please select a departure station",
  }),
  to: z.string({
    required_error: "Please select a destination station",
  }),
  date: z.date({
    required_error: "Please select a date",
  }),
});

type SearchFormValues = z.infer<typeof searchFormSchema>;

interface SearchTrainFormProps {
  stations: Station[];
}

export function SearchTrainForm({ stations }: SearchTrainFormProps) {
  const router = useRouter();
  const form = useForm<SearchFormValues>({
    resolver: zodResolver(searchFormSchema),
    defaultValues: {
      from: "",
      to: "",
    },
  });

  function onSubmit(data: SearchFormValues) {
    const searchParams: Record<string, string> = {
      from: data.from,
      to: data.to,
      date: data.date.toISOString().split('T')[0]
    };

    const queryString = new URLSearchParams(searchParams).toString();
    router.push(`/search?${queryString}`);
  }
  console.log(stations);

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Find Your Train</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-6 md:grid-cols-[1fr,auto,1fr,auto] items-end">
              <FormField
                control={form.control}
                name="from"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <StationSelect
                  
                      stations={stations}
                      value={field.value}
                      onChange={field.onChange}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button 
                type="button"
                variant="ghost" 
                size="icon" 
                className="mb-2"
                onClick={() => {
                  const from = form.getValues("from");
                  const to = form.getValues("to");
                  form.setValue("from", to);
                  form.setValue("to", from);
                }}
              >
                <ArrowRightLeft className="h-4 w-4" />
              </Button>

              <FormField
                control={form.control}
                name="to"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <StationSelect
                      
                      stations={stations}
                      value={field.value}
                      onChange={field.onChange}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <label className="text-sm font-medium">Date</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button variant="outline" className="w-full justify-start text-left font-normal">
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value ? (
                              <span>{field.value.toLocaleDateString()}</span>
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date < new Date()
                          }
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit" className="w-full mt-6" size="lg">
              Search Trains
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
