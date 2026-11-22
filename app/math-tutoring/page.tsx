import { ServicePage, serviceMetadata } from "@/components/site/ServicePage";

export const metadata = serviceMetadata("math-tutoring");

export default function Page() {
  return <ServicePage slug="math-tutoring" />;
}
