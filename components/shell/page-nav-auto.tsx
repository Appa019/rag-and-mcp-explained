"use client";

import { useSelectedLayoutSegment } from "next/navigation";
import type { RailStep } from "@/components/ui/progress-rail";
import { PageNav } from "@/components/ui/page-nav";
import { getAdjacent } from "@/lib/module-sections";

type Props = {
  basePath: string;
  steps: readonly RailStep[];
};

export const PageNavAuto = ({ basePath, steps }: Props) => {
  const segment = useSelectedLayoutSegment() ?? "";
  const { prev, next } = getAdjacent(steps, basePath, segment);
  return <PageNav prev={prev} next={next} />;
};
