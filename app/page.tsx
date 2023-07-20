import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  return (
    <>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
      <Card>
        <CardHeader>
          <CardTitle>Serverless function</CardTitle>
          <CardDescription>
            Node.js Serverless function which uses the google apis
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Edge function</CardTitle>
          <CardDescription>
            Edge function which uses the google rest apis
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </div>
    <div className="text-right mt-5">
    <Button className="text-right">Reload</Button>
    </div>
    </>
  );
}
