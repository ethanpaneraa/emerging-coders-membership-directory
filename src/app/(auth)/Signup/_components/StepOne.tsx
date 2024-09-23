"use client";

import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Label } from "~/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { Checkbox } from "~/components/ui/checkbox";
import { MAJORS, HOME_SCHOOLS } from "~/app/lib/constants";
import { type SignupInput } from "~/app/lib/validators/auth";

export const StepOne = () => {
  const {
    control,
    watch,
    formState: { errors },
  } = useFormContext<SignupInput>();

  const isDualDegree = watch("is_dual_degree_student");
  const has_second_major = watch("has_second_major");
  const hasMinor = watch("has_minor");

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="home_school">Home School</Label>
        <Controller
          name="home_school"
          control={control}
          rules={{ required: "Home school is required" }}
          render={({ field }) => (
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select your home school" />
              </SelectTrigger>
              <SelectContent>
                {HOME_SCHOOLS.map((school) => (
                  <SelectItem key={school} value={school}>
                    {school}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {errors.home_school?.message && (
          <p className="text-sm text-red-500">
            {String(errors.home_school.message)}
          </p>
        )}
      </div>

      <div className="flex items-center space-x-2">
        <Controller
          name="is_dual_degree_student"
          control={control}
          render={({ field }) => (
            <Checkbox
              id="is_dual_degree_student"
              checked={field.value === "true"}
              onCheckedChange={(checked) =>
                field.onChange(checked ? "true" : "false")
              }
            />
          )}
        />
        <Label htmlFor="is_dual_degree_student">
          Are you a dual degree student?
        </Label>
      </div>

      {isDualDegree && (
        <div className="space-y-2">
          <Label htmlFor="second_home_school">Second Home School</Label>
          <Controller
            name="second_home_school"
            control={control}
            rules={{
              required:
                "Second home school is required for dual degree students",
            }}
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select your second home school" />
                </SelectTrigger>
                <SelectContent>
                  {HOME_SCHOOLS.map((school) => (
                    <SelectItem key={school} value={school}>
                      {school}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.second_home_school?.message && (
            <p className="text-sm text-red-500">
              {String(errors.second_home_school.message)}
            </p>
          )}
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="major">Major</Label>
        <Controller
          name="major"
          control={control}
          rules={{ required: "Major is required" }}
          render={({ field }) => (
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={false}
                  className="w-full justify-between"
                >
                  <span className="truncate">
                    {field.value
                      ? MAJORS.find((major) => major === field.value)
                      : "Select major..."}
                  </span>
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command className="w-full">
                  <CommandInput placeholder="Search major..." className="h-9" />
                  <CommandList className="max-h-[300px] overflow-y-auto">
                    <CommandEmpty>No major found.</CommandEmpty>
                    <CommandGroup>
                      {MAJORS.map((major) => (
                        <CommandItem
                          key={major}
                          value={major}
                          onSelect={(currentValue) => {
                            field.onChange(
                              currentValue === field.value ? "" : currentValue,
                            );
                          }}
                          className="cursor-pointer"
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4 flex-shrink-0",
                              field.value === major
                                ? "opacity-100"
                                : "opacity-0",
                            )}
                          />
                          <span className="truncate">{major}</span>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          )}
        />
        {errors.major?.message && (
          <p className="text-sm text-red-500">{String(errors.major.message)}</p>
        )}
      </div>

      <div className="flex items-center space-x-2">
        <Controller
          name="has_second_major"
          control={control}
          render={({ field }) => (
            <Checkbox
              id="has_second_major"
              checked={field.value === "true"}
              onCheckedChange={(checked) =>
                field.onChange(checked ? "true" : "false")
              }
            />
          )}
        />
        <Label htmlFor="has_multiple_majors">Do you have a second major?</Label>
      </div>

      {has_second_major && (
        <div className="space-y-2">
          <Label htmlFor="second_major">Second Major</Label>
          <Controller
            name="second_major"
            control={control}
            rules={{
              required: "Second major is required if you have multiple majors",
            }}
            render={({ field }) => (
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={false}
                    className="w-full justify-between"
                  >
                    <span className="truncate">
                      {field.value
                        ? MAJORS.find((major) => major === field.value)
                        : "Select second major..."}
                    </span>
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command className="w-full">
                    <CommandInput
                      placeholder="Search second major..."
                      className="h-9"
                    />
                    <CommandList className="max-h-[300px] overflow-y-auto">
                      <CommandEmpty>No major found.</CommandEmpty>
                      <CommandGroup>
                        {MAJORS.map((major) => (
                          <CommandItem
                            key={major}
                            value={major}
                            onSelect={(currentValue) => {
                              field.onChange(
                                currentValue === field.value
                                  ? ""
                                  : currentValue,
                              );
                            }}
                            className="cursor-pointer"
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4 flex-shrink-0",
                                field.value === major
                                  ? "opacity-100"
                                  : "opacity-0",
                              )}
                            />
                            <span className="truncate">{major}</span>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            )}
          />
          {errors.second_major?.message && (
            <p className="text-sm text-red-500">
              {String(errors.second_major.message)}
            </p>
          )}
        </div>
      )}

      <div className="flex items-center space-x-2">
        <Controller
          name="has_minor"
          control={control}
          render={({ field }) => (
            <Checkbox
              id="has_minor"
              checked={field.value === "true"}
              onCheckedChange={(checked) =>
                field.onChange(checked ? "true" : "false")
              }
            />
          )}
        />
        <Label htmlFor="has_minor">Do you have a minor?</Label>
      </div>

      {hasMinor && (
        <div className="space-y-2">
          <Label htmlFor="minor">Minor</Label>
          <Controller
            name="minor"
            control={control}
            rules={{ required: "Minor is required if you have one" }}
            render={({ field }) => (
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={false}
                    className="w-full justify-between"
                  >
                    <span className="truncate">
                      {field.value
                        ? MAJORS.find((major) => major === field.value)
                        : "Select minor..."}
                    </span>
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command className="w-full">
                    <CommandInput
                      placeholder="Search minor..."
                      className="h-9"
                    />
                    <CommandList className="max-h-[300px] overflow-y-auto">
                      <CommandEmpty>No minor found.</CommandEmpty>
                      <CommandGroup>
                        {MAJORS.map((major) => (
                          <CommandItem
                            key={major}
                            value={major}
                            onSelect={(currentValue) => {
                              field.onChange(
                                currentValue === field.value
                                  ? ""
                                  : currentValue,
                              );
                            }}
                            className="cursor-pointer"
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4 flex-shrink-0",
                                field.value === major
                                  ? "opacity-100"
                                  : "opacity-0",
                              )}
                            />
                            <span className="truncate">{major}</span>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            )}
          />
          {errors.minor?.message && (
            <p className="text-sm text-red-500">
              {String(errors.minor.message)}
            </p>
          )}
        </div>
      )}
    </div>
  );
};
