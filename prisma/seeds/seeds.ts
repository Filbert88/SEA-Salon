import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    // const branches = [
    //     {
    //         name: 'Pondok Indah Mall',
    //         description: 'SEA-Salon at Pondok Indah Mall blends minimalist aesthetics with tropical flair. This salon features a specialized Balayage area where you can experience personalized hair coloring techniques. Enjoy taking selfies at our lush green wall, a perfect backdrop after your styling session.',
    //         location: 'Jl. Metro Pondok Indah No.123A, RT.11/RW.16, Pd. Pinang, Kec. Kby. Lama, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12310',
    //         phone: '081321456921',
    //         openingTime: new Date('1970-01-01T09:00:00'),
    //         closingTime: new Date('1970-01-01T21:00:00')
    //     },
    //     {
    //         name: 'Grand Indonesia',
    //         description: 'Located in the heart of the city, SEA-Salon at Grand Indonesia exudes a chic urban vibe. The salon includes a VIP room for privacy and luxury treatments. The décor combines sleek lines with soft lighting, ideal for both relaxation and capturing stunning selfies.',
    //         location: 'Grand Indonesia Lt.3 No.11-12, Jalan MH Thamrin No.1, Kb. Melati, Kecamatan Tanah Abang, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta 10310',
    //         phone: '085312340361',
    //         openingTime: new Date('1970-01-01T10:00:00'),
    //         closingTime: new Date('1970-01-01T20:00:00')
    //     },
    //     {
    //         name: 'Pantai Indah Kapuk',
    //         description: 'SEA-Salon in Pantai Indah Kapuk offers a breezy, beach-themed interior with touches of modern decor. Our signature feature is the rooftop lounge area, where clients can enjoy a stunning view post-treatment. The selfie spots here use natural light to highlight your new hairstyle beautifully.',
    //         location: 'PIK Avenue, B Jl. Pantai Indah Utara 1 No.11A, Kamal Muara, Kec. Penjaringan, Jkt Utara, Daerah Khusus Ibukota Jakarta 14470',
    //         phone: '082127386501',
    //         openingTime: new Date('1970-01-01T10:00:00'),
    //         closingTime: new Date('1970-01-01T20:00:00')
    //     },
    //     {
    //         name: 'Summarecon Mall Bekasi',
    //         description: 'In Summarecon Mall Bekasi, SEA-Salon presents a rustic charm with its use of reclaimed wood and industrial elements. This branch boasts a bespoke Beard Bar, catering to our male clients. Don’t miss out on snapping a selfie at our interactive mural wall, designed exclusively for SEA-Salon.',
    //         location: 'Summarecon Mall Bekasi, Lantai 1 , JL. Boulevard Ahmad Yani , Sentra Summarecon 17142, RT.006/RW.002, Marga Mulya, Kec. Bekasi Utara, Kota Bks, Jawa Barat 17123',
    //         phone: '082188905543',
    //         openingTime: new Date('1970-01-01T10:00:00'),
    //         closingTime: new Date('1970-01-01T19:00:00')
    //     },
    //     {
    //         name: 'Sun Plaza',
    //         description: 'At Sun Plaza, SEA-Salon creates a serene oasis with elements of water and stone. Our Waterfall Rinse Station offers a unique hair washing experience. The indoor garden selfie corner is a client favorite, providing a tranquil setting for your post-styling photos.',
    //         location: 'Sun Plaza Lt. 4 Zone A-22, Jl. KH. Zainul Arifin No.7, Madras Hulu, Kec. Medan Polonia, Kota Medan, Sumatera Utara 20152',
    //         phone: '085318904432',
    //         openingTime: new Date('1970-01-01T10:00:00'),
    //         closingTime: new Date('1970-01-01T20:00:00')
    //     },
    //     {
    //         name: 'Deli Park Mall Medan',
    //         description: 'SEA-Salon at Deli Park Mall Medan incorporates local cultural motifs into its contemporary design. This branch features a traditional Batak-inspired therapy room for scalp treatments. Capture your refreshed look in our culturally rich selfie spots around the salon.',
    //         location: 'Jl. Putri Hijau Dalam No.1 Blok OPQ, Kesawan, Kec. Medan Bar., Kota Medan, Sumatera Utara 20111',
    //         phone: '085318303365',
    //         openingTime: new Date('1970-01-01T10:00:00'),
    //         closingTime: new Date('1970-01-01T19:00:00')
    //     },
    //     {
    //         name: 'Paris Van Java',
    //         description: 'SEA-Salon in Paris Van Java indulges clients with a French provincial aesthetic. Lavender and vintage décor create a soothing environment, complete with a Coffee and Croissant Bar. The photo spot by our Parisian window facade is perfect for showcasing your chic new haircut.',
    //         location: 'Jl. Sukajadi No.131-139, Cipedes, Kec. Sukajadi, Kota Bandung, Jawa Barat 40162',
    //         phone: '082190349531',
    //         openingTime: new Date('1970-01-01T10:00:00'),
    //         closingTime: new Date('1970-01-01T20:00:00')
    //     },
    //     {
    //         name: 'Trans Studio Mall Bandung',
    //         description: 'The SEA-Salon at Trans Studio Mall is futuristic and bold, featuring dynamic lighting and geometric shapes. Our highlight is the Interactive Styling Zone, where technology meets hair artistry. Capture your futuristic style in our neon-lit selfie booths, making every photo pop.',
    //         location: 'Trans Studio Mall, Kecamatan Batununggal, Jl. Gatot Subroto No.289A, Cibangkong, Kota Bandung, Jawa Barat 40273',
    //         phone: '081329847503',
    //         openingTime: new Date('1970-01-01T09:00:00'),
    //         closingTime: new Date('1970-01-01T20:00:00')
    //     },
    // ];

    // for (const branch of branches) {
    //     await prisma.branch.create({
    //         data: branch
    //     });
    // }

  //   const services = [
  //     {
  //       name: "Haircuts and Styling",
  //       duration: 120,
  //       imageUrl: "services/hair-cut.jpg",
  //       price: 588000,
  //       description:
  //         "At Sea-Salon, we offer top-notch hair cutting services that will leave you looking and feeling your best. Our skilled team of hairstylists is dedicated to helping you achieve the perfect haircut that suits your style and enhances your natural beauty.\n\nWhether you're looking for a classic, trendy, or unique haircut, we've got you covered. Our experts stay up-to-date with the latest hair trends and techniques to provide you with the best possible service. We take the time to listen to your preferences and offer personalized consultations to ensure you get the haircut you desire.\n\nWhy choose our hair cutting services?\n- Highly trained and experienced hairstylists\n- A wide range of haircut styles and options\n- Precision cutting for a flawless finish\n- Exceptional customer service\n- Clean and comfortable salon environment\n- Affordable pricing\n\nSay goodbye to bad hair days and hello to confidence with a fresh haircut from SEA-Salon. Book your appointment today and experience the difference for yourself!",
  //     },
  //     {
  //       name: "Manicure and Pedicure",
  //       duration: 60,
  //       imageUrl: "services/manicure.png",
  //       price: 250000,
  //       description: "Step into a world of pampering and beauty with our manicure and pedicure services at SEA-Salon. Our treatments provide the perfect blend of care and glamour for your hands and feet, ensuring that every detail is polished to perfection. From classic shapes and colors to the latest trends in nail art, our skilled technicians are committed to giving you the best nail care experience possible.\n\n**Why choose our manicure and pedicure services?**\n- Expert nail technicians with attention to detail\n- Wide range of colors and finishes, from matte to glossy\n- Hygienic and relaxing setting\n- High-quality products for lasting results\n- Comprehensive care including cutting, filing, and cuticle treatment\n\nEnjoy the comfort of our salon while we treat you to a luxurious manicure and pedicure that will leave your nails looking fabulous and you feeling refreshed. Book your appointment today and elevate your nail game!",
  //     },
  //     {
  //       name: "Facial Treatments",
  //       duration: 60,
  //       imageUrl: "services/facial.jpg",
  //       price: 500000,
  //       description: "Experience rejuvenation and relaxation with our premium facial treatments at SEA-Salon. Our tailored facials are designed to cleanse, exfoliate, and nourish your skin, providing you with a radiant complexion and a refreshing glow. Whether you have sensitive skin, are dealing with acne, or simply want to maintain healthy skin, our expert estheticians will customize your treatment to suit your specific needs. Our facials help improve skin texture, reduce signs of aging, and restore balance, leaving you with a clear, healthy appearance.\n\n**Why choose our facial treatments?**\n- Customized skincare solutions for all skin types\n- Use of high-quality products and modern techniques\n- Deep cleansing and hydration for optimal skin health\n- Relaxing environment to unwind and rejuvenate\n- Skilled estheticians who understand your skincare needs\n\nIndulge in the ultimate skincare experience and let us pamper you with our luxurious facial treatments. Book your session today and transform your skin with lasting results.",
  //     },
  //     {
  //       name: "Hair Coloring",
  //       duration: 180,
  //       imageUrl: "services/hair-coloring.jpg",
  //       price: 688000,
  //       description: "Discover the art of hair coloring at SEA-Salon with our diverse techniques like French Balayage, French Gloss, traditional highlights, and playful peek-a-boo highlights. Our expert colorists specialize in creating personalized hair coloring experiences that reflect your individual style and preferences.\n\n**Why choose our hair coloring services?**\n- Talented colorists skilled in a variety of techniques\n- Custom color consultations to match your desired look\n- Top-quality products for vibrant, long-lasting color\n- Gentle on your hair for a healthy, shiny finish\n- Options for subtle to dramatic transformations\n\nElevate your look with our professional hair coloring services. Whether you're aiming for a subtle change or a bold new look, we're here to help you achieve beautiful, personalized results. Book your appointment today and let your hair shine!",
  //     },
  //     {
  //       name: "Makeup",
  //       duration: 60,
  //       imageUrl: "services/makeup.jpg",
  //       price: 200000,
  //       description: "Makeup is like an art kit for your face, and at SEA-Salon, it's all about using cosmetics to bring out your best features, express your style, and feel confident in your own skin. Our makeup services range from natural looks to full glam, ensuring you have the perfect makeup for any occasion.\n\n**Why choose our makeup services?**\n- Skilled makeup artists with a flair for aesthetics\n- Personalized sessions to highlight your unique beauty\n- High-quality, long-lasting makeup products\n- Techniques tailored to your event, skin type, and preferences\n- Friendly and supportive environment\n\nDiscover the power of makeup at our salon! Whether you're preparing for a special event or just want to feel extraordinary, our artists are here to enhance your natural beauty. Book your makeup session today and experience the transformation!",
  //     },
  //   ];

  //   const createdServices = await Promise.all(services.map(service => {
  //     return prisma.service.create({
  //       data: service,
  //     });
  //   }));

  // const branches = await prisma.branch.findMany();

  // for (const branch of branches) {
  //   // Always include the first three services
  //   for (let i = 0; i < 3; i++) {
  //     await prisma.branchService.create({
  //       data: {
  //         branchId: branch.id,
  //         serviceId: createdServices[i].id,
  //       },
  //     });
  //   }

  //   // Randomly decide whether to include the optional services (Hair Coloring and Makeup)
  //   for (let i = 3; i < createdServices.length; i++) {
  //     if (Math.random() < 0.7) { // 70% chance to include the service
  //       await prisma.branchService.create({
  //         data: {
  //           branchId: branch.id,
  //           serviceId: createdServices[i].id,
  //         },
  //       });
  //     }
  //   }
  // }

  const branchIds = [1,2,3,4,5,6,7,8];
  const stylists = [
    {
      name: "Waris",
      imageUrl: "/stylist/male_barber.jpg",
      price:100000,
    },
    {
      name: "Doddy",
      imageUrl: "/stylist/male_barber.jpg",
      price:105000,
    },
    {
      name: "Nasik",
      imageUrl: "/stylist/male_barber.jpg",
      price:110000,
    },
    {
      name: "Riska",
      imageUrl: "/stylist/female_barber.jpg",
      price:200000,
    },
    {
      name: "Aang",
      imageUrl: "/stylist/male_barber.jpg",
      price:300000,
    },
    {
      name: "Muskin",
      imageUrl: "/stylist/male_barber.jpg",
      price:150000,
    },
    {
      name: "Iis",
      imageUrl: "/stylist/female_barber.jpg",
      price:188000,
    },
    {
      name: "Christoper",
      imageUrl: "/stylist/male_barber.jpg",
      price:195000,
    },
    {
      name: "Albert",
      imageUrl: "/stylist/male_barber.jpg",
      price:250000,
    },
    {
      name: "Elbert Chailes",
      imageUrl: "/stylist/male_barber.jpg",
      price:295000,
    },
    {
      name: "Wawan",
      imageUrl: "/stylist/male_barber.jpg",
      price:150000,
    },
    {
      name: "Wisnu",
      imageUrl: "/stylist/male_barber.jpg",
      price:188000,
    },
    {
      name: "Zoel",
      imageUrl: "/stylist/male_barber.jpg",
      price:288000,
    },
    {
      name: "Endy",
      imageUrl: "/stylist/male_barber.jpg",
      price:259000,
    },
    {
      name: "Yusri",
      imageUrl: "/stylist/male_barber.jpg",
      price:108000,
    },
    {
      name: "Yunus",
      imageUrl: "/stylist/male_barber.jpg",
      price:288000,
    },
    {
      name: "Jeffry",
      imageUrl: "/stylist/male_barber.jpg",
      price:169000,
    },
    {
      name: "Andy",
      imageUrl: "/stylist/male_barber.jpg",
      price:159000,
    },
    {
      name: "Surjanti",
      imageUrl: "/stylist/female_barber.jpg",
      price:125000,
    },
    {
      name: "William Glory",
      imageUrl: "/stylist/male_barber.jpg",
      price:130000,
    },
    {
      name: "Derwin",
      imageUrl: "/stylist/male_barber.jpg",
      price:158000,
    },
    {
      name: "John Lembong",
      imageUrl: "/stylist/male_barber.jpg",
      price:199000,
    },
    {
      name: "Juan Alfred",
      imageUrl: "/stylist/male_barber.jpg",
      price:149000,
    },
    {
      name: "Farel Winalda",
      imageUrl: "/stylist/male_barber.jpg",
      price:165000,
    },
    {
      name: "Wilson Yusda",
      imageUrl: "/stylist/male_barber.jpg",
      price:120000,
    },
    {
      name: "Benardo",
      imageUrl: "/stylist/male_barber.jpg",
      price:200000,
    },
    {
      name: "Apau Budianto",
      imageUrl: "/stylist/male_barber.jpg",
      price:188000,
    },
  ];

  for (let i = branchIds.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [branchIds[i], branchIds[j]] = [branchIds[j], branchIds[i]];
  }

  // Assign stylists to branches, wrap around using modulo
  for (let i = 0; i < stylists.length; i++) {
    const stylist = stylists[i];
    await prisma.stylist.create({
      data: {
        ...stylist,
        branchId: branchIds[i % branchIds.length],
      },
    });
  }

}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
