import { TourVoucher } from "@/components/TourVoucher";

const TourVoucherPage = () => {
  const handleSave = (data: any) => {
    console.log("Voucher data saved:", data);
    // Здесь можно добавить логику сохранения в localStorage или отправку на сервер
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <TourVoucher
      tourTitle="Tour Voucher"
      onSave={handleSave}
      onPrint={handlePrint}
    />
  );
};

export default TourVoucherPage;