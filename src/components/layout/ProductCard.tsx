"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Image, Product } from "@prisma/client";
import { AnimatePresence, motion } from "framer-motion";
import { CldImage } from "next-cloudinary";

import { Icons } from "../shared/Icons";
import { Button, buttonVariants } from "../ui/button";

interface ProductCardProps {
  product: Product & { images: Image[] };
  openQuickView: (product: Product & { images: Image[] }) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  openQuickView,
}) => {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="group relative cursor-pointer overflow-hidden rounded-lg shadow-lg"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={() => router.push(`/product/${product.id}`)}
    >
      <div className="relative h-80 w-full">
        <CldImage
          src={product.images[0].url}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="absolute inset-0 flex flex-col justify-end p-6 text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="mb-2 text-2xl font-bold">{product.name}</h3>
            <p className="mb-4 line-clamp-2 text-sm">{product.description}</p>
            <Button
              rounded="full"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                openQuickView(product);
              }}
            >
              <Icons.eye className="size-5" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

interface QuickViewModalProps {
  product: Product & { images: Image[] };
  closeQuickView: () => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  closeQuickView,
}) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-md"
    onClick={closeQuickView}
  >
    <motion.div
      initial={{ scale: 0.9, y: 50 }}
      animate={{ scale: 1, y: 0 }}
      exit={{ scale: 0.9, y: 50 }}
      transition={{ type: "spring", damping: 15 }}
      className="relative w-full max-w-screen-md overflow-hidden rounded-2xl bg-background shadow-2xl"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="absolute right-5 top-5">
        <Button size="icon" onClick={closeQuickView} variant="secondary">
          <Icons.close className="size-6" />
        </Button>
      </div>
      <div className="flex flex-col md:flex-row">
        <CldImage
          src={product.images[0].url}
          alt={product.name}
          width={600}
          height={600}
          className="size-full object-cover lg:size-80"
        />
        <div className="bg-background p-8">
          <h2 className="text-3xl font-bold text-gray-900">{product.name}</h2>

          <p className="mb-6 text-gray-600">{product.description}</p>

          <Link
            onClick={() => closeQuickView()}
            href={`/product/${product.id}`}
            className={buttonVariants({ rounded: "full" })}
          >
            Learn More
            <Icons.chevronRight className="ml-2 size-5" />
          </Link>
        </div>
      </div>
    </motion.div>
  </motion.div>
);

export default function Products({
  products,
}: {
  products: (Product & { images: Image[] })[];
}) {
  const [selectedProduct, setSelectedProduct] = useState<
    (Product & { images: Image[] }) | null
  >(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  const openQuickView = (product: Product & { images: Image[] }) => {
    setSelectedProduct(product);
    setIsQuickViewOpen(true);
  };

  const closeQuickView = () => {
    setIsQuickViewOpen(false);
  };

  return (
    <>
      <motion.div
        className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:grid-cols-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, staggerChildren: 0.1 }}
      >
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            openQuickView={openQuickView}
          />
        ))}
      </motion.div>

      <AnimatePresence>
        {isQuickViewOpen && selectedProduct && (
          <QuickViewModal
            product={selectedProduct}
            closeQuickView={closeQuickView}
          />
        )}
      </AnimatePresence>
    </>
  );
}
