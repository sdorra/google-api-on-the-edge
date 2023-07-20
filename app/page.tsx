import FetchCard from "@/components/FetchCard";

export default function Home() {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FetchCard
          url="/serverless"
          title="Serverless function"
          description="Node.js Serverless function which uses the google apis"
        />
        <FetchCard
          url="/edge"
          title="Edge function"
          description="Edge function which uses the google rest apis"
        />
        <FetchCard
          url="/isr"
          title="ISR function"
          description="Incremental Static Regeneration function which uses the google rest apis"
        />
      </div>
    </>
  );
}
