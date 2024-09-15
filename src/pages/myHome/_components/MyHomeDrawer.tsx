import { Drawer, DrawerContent, DrawerTrigger, PlusButton } from "@/components";

interface Props {
  component: React.ReactNode;
}

export const MyHomeDrawer = ({ component }: Props) => {
  return (
    <Drawer>
      <DrawerTrigger>
        <PlusButton />
      </DrawerTrigger>
      <DrawerContent className="overflow-auto min-h-[92%] max-h-[92%] after:content-none">
        <div>{component}</div>
      </DrawerContent>
    </Drawer>
  );
};
